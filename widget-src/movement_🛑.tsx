import {
  distance,
  midpoint,
  multiply,
  normalize,
  vectorToFacing
} from './vector'
import { Facing, isOverlapping } from './lib'

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
function movementMinDistance() {
  return 60 / figma.viewport.zoom
}

// some arbitrary ratio to map distance from mouse from avatar to movement speed
function movementRatio() {
  return movementMode === MovementMode.Foot ? 50 : 10
}

// arbitrary max speed, can adjust based on art
function movementMaxSpeed() {
  return movementMode === MovementMode.Foot ? 12 : 36
}

let currentViewportCenter: Vector = figma.viewport.center
export function movement(props: {
  widgetNode: WidgetNode
  widgetRect: Rect
  setFacing: (facing: Facing) => void
  lastSpriteIndex: number
  collisionRects: Rect[]
}) {
  const { widgetNode, widgetRect, setFacing, lastSpriteIndex, collisionRects } =
    props

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

  const newPosition = getMovementVectorRespectingCollision(
    widgetRect,
    attemptedMovementVector,
    collisionRects
  )

  // check collision here

  if (newPosition.x !== widgetNode.x || newPosition.y !== widgetNode.y) {
    // This is functionally the same as:
    // widgetNode.x = x
    // widgetNode.y = y
    // But sets them both in 1 Plugin API call instead of 2
    widgetNode.relativeTransform = [
      [1, 0, newPosition.x],
      [0, 1, newPosition.y]
    ]

    // update camera only if char is moving (for performance)
    if (midpoint(widgetRect) !== currentViewportCenter) {
      figma.viewport.center = midpoint(widgetRect)
      currentViewportCenter = midpoint(widgetRect)
    }

    return (lastSpriteIndex + 1) % 120 // a number that is divisible by 2 and 3
  } else {
    // Returning 0 here forces the same neutral stance frame when not moving
    return 0
  }
}

function getMovementVectorRespectingCollision(
  rect: Rect,
  vector: Vector,
  collisionRects: Rect[]
) {
  rect = { ...rect, x: rect.x + vector.x }

  const collidingXRectangle = collisionRects.find((r) => isOverlapping(rect, r))
  if (collidingXRectangle) {
    const newXPos =
      vector.x > 0
        ? collidingXRectangle.x - 64
        : collidingXRectangle.x + collidingXRectangle.width
    rect = { ...rect, x: newXPos }
  }

  rect = { ...rect, y: rect.y + vector.y }
  const collidingYRectangle = collisionRects.find((r) => isOverlapping(rect, r))
  if (collidingYRectangle) {
    const newYPos =
      vector.y > 0
        ? collidingYRectangle.y - 64
        : collidingYRectangle.y + collidingYRectangle.height
    rect = { ...rect, y: newYPos }
  }

  return rect
}

export function getMovementDirectionVector(from: Rect, to: Vector) {
  const fromMidpoint = midpoint(from)
  const mouseDistance = distance(fromMidpoint, to)

  if (mouseDistance < movementMinDistance()) {
    return { x: 0, y: 0 }
  }

  const movementSpeed = Math.min(
    mouseDistance / movementRatio(),
    movementMaxSpeed()
  )
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
