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
  // Use relativeTransform to make 1 plugin API call instead of 2
  const relativeTransform = n.relativeTransform
  return { x: relativeTransform[0][2], y: relativeTransform[1][2], width: n.width, height: n.height }
}
