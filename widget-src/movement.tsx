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
export const MOVEMENT_SPEED = 12
// Movement is constrained to 8 directions?
export function getMovementDirectionVector(from: Rect, to: Vector) {
  const fromMidpoint = midpoint(from)

  const movementDirectionVector = multiply(
    normalize({ x: to.x - fromMidpoint.x, y: to.y - fromMidpoint.y }),
    MOVEMENT_SPEED
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

export function updateCamera(player: Rect) {
  figma.viewport.center = midpoint(player)
}

export function getSprite(
  facing: string,
  frame: number,
  wardrobeIndex: number
) {
  if (wardrobeIndex === 0) {
    if (frame === 0) {
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
    if (frame === 0) {
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
