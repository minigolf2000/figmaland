const { widget } = figma
const {
  useSyncedState,
  useStickable,
  useSyncedMap,
  usePropertyMenu,
  useWidgetId
} = widget
const { AutoLayout, Ellipse, Frame, Image, Rectangle, SVG, Text } = widget

import { DEBUG } from './code'
import { isOverlapping } from './lib'

const FPS = 30

export function proximityAnimations(
  characterRect: Rect,
  proximityAnimationRects: (FrameNode | GroupNode)[]
) {
  const widgetId = widget.useWidgetId()
  for (const a of proximityAnimationRects) {
    if (isOverlapping(characterRect, a)) {
      a.setPluginData(
        'animation',
        JSON.stringify({
          id: widgetId,
          timestamp: Math.round(Date.now() / 1000)
        })
      )

      if (DEBUG) {
        console.log(`overlapping with ${a.name}`)
      }
      for (const c of a.children) {
        c.visible = false
      }

      let i = 0
      const myInterval = setInterval(() => {
        if (i < a.children.length) {
          a.children[i].visible = true
          i++
        } else {
          clearInterval(myInterval)
        }
      }, FPS * 10)
    } else {
      const { id, timestamp } = JSON.parse(a.getPluginData('animation'))
    }
  }
}

// create data structure holding all ongoing animations
