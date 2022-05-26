export type Facing = 'up' | 'left' | 'down' | 'right'

export function isOverlapping(a: Rect, b: Rect) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.height + a.y > b.y
  )
}

// Convert to rect for performance. Accessing these fields is expensive
export function toRect(n: SceneNode): Rect {
  const { x, y, width, height } = n
  return { x, y, width, height }
}
