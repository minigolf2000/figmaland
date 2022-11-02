import { isOverlapping } from './lib'

export function subway(
  subwayRects: { [line: string]: { in?: Rect; out?: Rect } },
  characterRect: Rect,
  character: WidgetNode
) {
  Object.keys(subwayRects).forEach((line: string) => {
    const { in: inRect, out: outRect } = subwayRects[line]
    if (!inRect || !outRect) {
      return
    }
    if (isOverlapping(characterRect, inRect)) {
      character.relativeTransform = [
        [1, 0, outRect.x],
        [0, 1, outRect.y]
      ]
    }
  })
}
