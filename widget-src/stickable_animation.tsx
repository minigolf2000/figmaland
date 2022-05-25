const { widget } = figma
const {
  useSyncedState,
  useStickable,
  useSyncedMap,
  usePropertyMenu,
  useWidgetId
} = widget
const { AutoLayout, Ellipse, Frame, Image, Rectangle, SVG, Text } = widget

import { distance, midpoint } from './vector'

const FPS = 30
let myInterval: number

export function useStickableAnimation() {
  const widgetId = widget.useWidgetId()

  useStickable(() => {
    const widget = figma.getNodeById(widgetId) as WidgetNode
    const { stuckTo } = widget

    if (stuckTo?.name === 'figma-gather-animate' && 'children' in stuckTo) {
      for (const c of stuckTo.children) {
        c.visible = false
      }

      let i = 0
      setInterval(() => {
        if (i < stuckTo.children.length) {
          stuckTo.children[i].visible = true
        }
      }, FPS)
    }
  })
}
