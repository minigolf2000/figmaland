export type Facing = 'up' | 'left' | 'down' | 'right'

export function isOverlapping(a: Rect, b: Rect) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.height + a.y > b.y
  )
}

// Convert a SceneNode to Rect. Repeatedly accessing SceneNode properties
// is expensive, so if we need to access these multiple times it's more
// performant to first clone a Rect that has these properties
export function toRect(n: SceneNode): Rect {
  // Use absoluteTransform to make 1 plugin API call instead of 2
  const absoluteTransform = n.absoluteTransform
  return {
    x: absoluteTransform[0][2],
    y: absoluteTransform[1][2],
    width: n.width,
    height: n.height
  }
}
