import {
  distance,
  midpoint,
  multiply,
  normalize,
  vectorToFacing
} from './vector'
import { Facing, isOverlapping1D } from './lib'
import { currentAnimations } from './animated_art_⏱'

export enum MovementMode {
  Foot,
  Bicycle
}

export let movementMode = MovementMode.Foot
export function setMovementMode(mode: MovementMode) {
  movementMode = mode
}

// min distance the mouse needs to be from center of avatar to move
// At zoom level 100%, mouse must be 60 pixels away
// At zoom level 200%, mouse must be 120 pixels away (which feels the same as at 100%)
function movementMinDistance() { return 60 / figma.viewport.zoom }

// some arbitrary ratio to map distance from mouse from avatar to movement speed
function movementRatio() {
  return movementMode === MovementMode.Foot ? 50 : 10
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
    // todo: does this need to account for zoom level?
    distance(figma.viewport.center, midpoint(widgetNode)) >
    movementMaxSpeed() * 10
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
  if (!figma.activeUsers[0].position) {
    throw 'no cursor position found'
  }
  const attemptedMovementVector = getMovementDirectionVector(
    widgetRect,
    figma.activeUsers[0].position
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
    return (lastSpriteIndex + 1) % 120 // a number that is divisible by 2 and 3
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
  const mouseDistance = distance(fromMidpoint, to)

  if (mouseDistance < movementMinDistance()) {
    return {x: 0, y: 0}
  }

  const movementSpeed = Math.min(mouseDistance / movementRatio(), movementMaxSpeed())
  return multiply(
    normalize({ x: to.x - fromMidpoint.x, y: to.y - fromMidpoint.y }),
    movementSpeed
  )
}

export function getFacingFromMovementDirection(direction: Vector): Facing {
  if (direction.x === 0 && direction.y === 0) {
    return 'down'
  }

  return vectorToFacing(direction)
}
