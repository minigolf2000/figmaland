export type Facing = 'up' | 'left' | 'down' | 'right'

export function isOverlapping(a: Rect, b: Rect) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.height + a.y > b.y
  )
}

export function isOverlapping1D(aLeft: number, aRight: number, bLeft: number, bRight: number)
{
  return aLeft < bRight && aRight > bLeft
}

// Convert a SceneNode to Rect. Repeatedly accessing SceneNode properties
// is expensive, so if we need to access these multiple times it's more
// performant to first clone a Rect that has these properties
export function toRect(n: SceneNode): Rect {
  const { x, y, width, height } = n
  return { x, y, width, height }
}
