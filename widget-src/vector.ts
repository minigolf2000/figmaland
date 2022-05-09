import { Facing } from './lib'

// Helper methods on Figma's Vector type
export function midpoint(r: Rect): Vector {
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
}

export function direction(a: Rect, b: Rect): Vector {
  const aMidpoint = midpoint(a)
  const bMidpoint = midpoint(b)

  return { x: aMidpoint.x - bMidpoint.x, y: aMidpoint.y - bMidpoint.y }
}

export function add(v1: Vector, v2: Vector): Vector {
  return { x: v1.x + v2.x, y: v1.y + v2.y }
}

export function distance(v1: Vector, v2: Vector): number {
  const a = v1.x - v2.x
  const b = v1.y - v2.y
  return Math.sqrt(a * a + b * b)
}

// Return a vector such that vector v1 has magnitude of m
// e.g. vector {x: 1, y: 1}, m: 2.5 returns {x: 1.6, y: 1.6}
export function multiply(v1: Vector, m: number): Vector {
  const mag = magnitude(v1)
  const m1 = m / mag

  return { x: v1.x * m1, y: v1.y * m1 }
}

export function normalize(v: Vector): Vector {
  const length = magnitude(v)
  return { x: v.x / length, y: v.y / length }
}

export function vectorToFacing(v: Vector): Facing {
  const theta = Math.atan(v.y / v.x)
  if (Math.abs((theta * 2) / Math.PI) < 0.5) {
    return v.x > 0 ? 'right' : 'left'
  } else {
    return v.y > 0 ? 'down' : 'up'
  }
}

export function facingToVector(f: Facing): Vector {
  switch (f) {
    case 'up':
      return { x: 0, y: -1 }
    case 'down':
      return { x: 0, y: 1 }
    case 'left':
      return { x: -1, y: 0 }
    case 'right':
      return { x: 1, y: 0 }
    default:
      throw 'Invalid facing'
  }
}

export function magnitude(v: Vector): number {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}
