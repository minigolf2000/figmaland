export type Facing = 'up' | 'left' | 'down' | 'right'

export function isOverlapping(a: Rect, b: Rect) {
  return isOverlapping1D(a.x, a.x + a.width, b.x, b.x + b.width) &&
    isOverlapping1D(a.y, a.y + a.height, b.y, b.y + b.height)

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
