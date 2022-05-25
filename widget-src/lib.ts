export type Facing = 'up' | 'left' | 'down' | 'right'

export function isOverlapping(a: Rect, b: Rect) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.height + a.y > b.y
  )
}
