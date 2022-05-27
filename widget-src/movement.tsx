import greendown0 from './img/green/basic-down-0.png'
import greenleft0 from './img/green/basic-left-0.png'
import greenright0 from './img/green/basic-right-0.png'
import greenup0 from './img/green/basic-up-0.png'
import greendown1 from './img/green/basic-down-1.png'
import greenleft1 from './img/green/basic-left-1.png'
import greenright1 from './img/green/basic-right-1.png'
import greenup1 from './img/green/basic-up-1.png'

import bluedown0 from './img/blue/basic-down-0.png'
import blueleft0 from './img/blue/basic-left-0.png'
import blueright0 from './img/blue/basic-right-0.png'
import blueup0 from './img/blue/basic-up-0.png'
import bluedown1 from './img/blue/basic-down-1.png'
import blueleft1 from './img/blue/basic-left-1.png'
import blueright1 from './img/blue/basic-right-1.png'
import blueup1 from './img/blue/basic-up-1.png'

import guydown0 from './img/guy1/basic-down-0.png'
import guyleft0 from './img/guy1/basic-left-0.png'
import guyright0 from './img/guy1/basic-right-0.png'
import guyup0 from './img/guy1/basic-up-0.png'
import guydown1 from './img/guy1/basic-down-1.png'
import guyleft1 from './img/guy1/basic-left-1.png'
import guyright1 from './img/guy1/basic-right-1.png'
import guyup1 from './img/guy1/basic-up-1.png'
import {
  distance,
  magnitude,
  midpoint,
  multiply,
  normalize,
  vectorToFacing
} from './vector'
import { Facing, isOverlapping, isOverlapping1D, toRect } from './lib'
import { currentAnimations } from './proximity_animations'

// min distance the mouse needs to be from center of avatar to move
export const MOVEMENT_MIN_DISTANCE = 50

export enum MovementMode {
  Foot,
  Bicycle
}

let movementMode = MovementMode.Foot
export function setMovementMode(mode: MovementMode) {
  movementMode = mode
}

// some arbitrary ratio to map distance from mouse from avatar to movement speed
function movementRatio() {
  return movementMode === MovementMode.Foot ? 30 : 10
}

// arbitrary max speed, can adjust based on art
function movementMaxSpeed() {
  return movementMode === MovementMode.Foot ? 12 : 36
}

figma.on('close', () => {
  for (const nodeId of Object.keys(currentAnimations)) {
    currentAnimations[nodeId].animationNode.setPluginData('animation', '')
  }
})

export function movement(props: {
  widgetNode: WidgetNode
  widgetRect: Rect
  setFacing: (facing: Facing) => void
  lastSpriteIndex: number,
  collisionNodes: SceneNode[]
}) {
  const { widgetNode, widgetRect, setFacing, lastSpriteIndex, collisionNodes } = props

  // User has panned their camera, let them pan and exit the widget to stop character movement
  if (
    distance(figma.viewport.center, midpoint(widgetNode)) >
    movementMaxSpeed() * 2
  ) {
    figma.currentPage.selection = []
    setFacing('down')
    figma.closePlugin(
      'Stopping character movement to allow free camera. Click character to resume'
    )
    return lastSpriteIndex
  }

  // Character gets deselected. Exit
  if (figma.currentPage.selection.toString() !== [widgetNode].toString()) {
    setFacing('down')
    figma.closePlugin(
      'Character is no longer selected and has stopped moving. Click character to resume'
    )
    return lastSpriteIndex
  }

  // handle cursor position not found
  const attemptedMovementVector = getMovementDirectionVector(
    widgetRect,
    figma.activeUsers[0].position!
  )
  setFacing(getFacingFromMovementDirection(attemptedMovementVector))

  const movementVector = getMovementVectorRespectingCollision(widgetRect, attemptedMovementVector, collisionNodes)

  // check collision here

  if (movementVector.x !== 0 || movementVector.y !== 0) {
    // This is functionally the same as:
    // widgetNode.x = x
    // widgetNode.y = y
    // But sets them both in 1 Plugin API call instead of 2
    widgetNode.relativeTransform = [
      [1, 0, widgetRect.x + movementVector.x],
      [0, 1, widgetRect.y + movementVector.y]
    ]
    figma.viewport.center = midpoint(widgetRect) // update camera
    return (lastSpriteIndex + 1) % 8
  } else {
    // Returning 0 here forces the same neutral stance frame when not moving
    return 0
  }
}



function getMovementVectorRespectingCollision(rect: Rect, vector: Vector, collisionNodes: SceneNode[]) {
  const newMoveX = getMovePositionRespectingCollision1D(rect.x, rect.x + rect.width, vector.x, collisionNodes, (n: SceneNode) => isOverlapping1D(rect.x, rect.x + rect.width, n.x, n.x + n.width))
  const newMoveY = getMovePositionRespectingCollision1D(rect.y, rect.y + rect.height, vector.y, collisionNodes, (n: SceneNode) => isOverlapping1D(rect.y, rect.y + rect.height, n.y, n.y + n.height))

  return {x: newMoveX, y: newMoveY}
}

function getMovePositionRespectingCollision1D(left: number, right: number, move: number, collisionNodes: SceneNode[], filterOverlappingNodesFunc: (n: SceneNode) => boolean) {
  if (move > 0) {
    const firstOverlappingNode = collisionNodes.filter(filterOverlappingNodesFunc).sort(n => n.x)
    if (firstOverlappingNode[0]) {
      return firstOverlappingNode[0].x - 64 - left
    }
  }
  if (move < 0) {
    const firstOverlappingNode = collisionNodes.filter(filterOverlappingNodesFunc).sort(n => n.x).reverse()
    if (firstOverlappingNode[0]) {
      return right - firstOverlappingNode[0].x - firstOverlappingNode[0].width
    }
  }
  return move
}


export function getMovementDirectionVector(from: Rect, to: Vector) {
  const fromMidpoint = midpoint(from)

  const dist = distance(
    { x: fromMidpoint.x, y: fromMidpoint.y },
    { x: to.x, y: to.y }
  )
  let movementSpeed
  if (dist < MOVEMENT_MIN_DISTANCE) {
    movementSpeed = 0
  } else if (
    dist <
    movementRatio() * movementMaxSpeed() + MOVEMENT_MIN_DISTANCE
  ) {
    movementSpeed = dist / movementRatio()
  } else {
    movementSpeed = movementMaxSpeed()
  }

  const movementDirectionVector = multiply(
    normalize({ x: to.x - fromMidpoint.x, y: to.y - fromMidpoint.y }),
    movementSpeed
  )

  return distance(fromMidpoint, to) < 32
    ? { x: 0, y: 0 }
    : movementDirectionVector
}

export function getFacingFromMovementDirection(direction: Vector): Facing {
  if (direction.x === 0 && direction.y === 0) {
    return 'down'
  }

  return vectorToFacing(direction)
}

export function getSprite(
  facing: string,
  frame: number,
  wardrobeIndex: number
) {
  if (wardrobeIndex === 0) {
    if (frame < 4) {
      switch (facing) {
        case 'down':
          return guydown0
        case 'left':
          return guyleft0
        case 'right':
          return guyright0
        case 'up':
          return guyup0
      }
    } else {
      switch (facing) {
        case 'down':
          return guydown1
        case 'left':
          return guyleft1
        case 'right':
          return guyright1
        case 'up':
          return guyup1
      }
    }
  } else {
    if (frame < 4) {
      switch (facing) {
        case 'down':
          return bluedown0
        case 'left':
          return blueleft0
        case 'right':
          return blueright0
        case 'up':
          return blueup0
      }
    } else {
      switch (facing) {
        case 'down':
          return bluedown1
        case 'left':
          return blueleft1
        case 'right':
          return blueright1
        case 'up':
          return blueup1
      }
    }
  }
}
