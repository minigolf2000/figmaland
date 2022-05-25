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

import {
  distance,
  magnitude,
  midpoint,
  multiply,
  normalize,
  vectorToFacing
} from './vector'
import { Facing } from './lib'

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

export function movement(props: {
  widgetNode: WidgetNode
  setFacing: (facing: Facing) => void
  lastSpriteIndex: number
}) {
  const { widgetNode, setFacing, lastSpriteIndex } = props
  if (
    distance(figma.viewport.center, midpoint(widgetNode)) > movementMaxSpeed()
  ) {
    figma.currentPage.selection = []
    setFacing('down')
    figma.closePlugin(
      'Stopping character movement to allow free camera. Click character to resume'
    )
    return lastSpriteIndex
  }
  if (figma.currentPage.selection.toString() !== [widgetNode].toString()) {
    setFacing('down')
    figma.closePlugin(
      'Character is no longer selected and has stopped moving. Click character to resume'
    )
    return lastSpriteIndex
  }

  // handle cursor position not found
  const movementDirection = getMovementDirectionVector(
    widgetNode,
    figma.activeUsers[0].position!
  )
  setFacing(getFacingFromMovementDirection(movementDirection))

  if (movementDirection.x !== 0 || movementDirection.y !== 0) {
    widgetNode.x += movementDirection.x
    widgetNode.y += movementDirection.y
    figma.viewport.center = midpoint(widgetNode) // update camera
    return (lastSpriteIndex + 1) % 8
  } else {
    // Returning 0 here forces the same neutral stance frame when not moving
    return 0
  }
}

// Movement is constrained to 8 directions?
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
          return greendown0
        case 'left':
          return greenleft0
        case 'right':
          return greenright0
        case 'up':
          return greenup0
      }
    } else {
      switch (facing) {
        case 'down':
          return greendown1
        case 'left':
          return greenleft1
        case 'right':
          return greenright1
        case 'up':
          return greenup1
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
