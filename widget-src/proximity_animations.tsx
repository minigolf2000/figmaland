import { DEBUG } from './code'
import { isOverlapping } from './lib'

// Proximity animations will loop an animation when a
// player is nearby
const ANIMATE_ONCE_EVERY_N_FRAMES = 5

export function proximityAnimations(
  characterRect: WidgetNode,
  proximityAnimationRects: (FrameNode | GroupNode)[]
) {
  addOrRemoveAnimations(characterRect, proximityAnimationRects)
  incrementAnimations()
}

function addOrRemoveAnimations(
  characterRect: WidgetNode,
  proximityAnimationRects: (FrameNode | GroupNode)[]
) {
  const widgetId = characterRect.id
  for (const a of proximityAnimationRects) {
    if (isOverlapping(characterRect, a)) {
      if (!!a.getPluginData('animation')) {
        break
      }
      a.setPluginData(
        'animation',
        JSON.stringify({
          id: widgetId,
          timestamp: Math.round(Date.now() / 1000)
        })
      )

      for (const c of a.children) {
        c.visible = false
      }

      currentAnimations[a.id] = {
        framesSinceLast: 0,
        nextChildIndex: 0,
        numChildren: a.children.length,
        animationNode: a
      }
    } else {
      delete currentAnimations[a.id]
      a.setPluginData('animation', '')
    }
  }
}

interface AnimationState {
  framesSinceLast: number
  nextChildIndex: number
  numChildren: number
  animationNode: FrameNode | GroupNode
}
let currentAnimations: { [nodeId: string]: AnimationState } = {}

function incrementAnimations() {
  for (const nodeId of Object.keys(currentAnimations)) {
    const { framesSinceLast, nextChildIndex, numChildren, animationNode } =
      currentAnimations[nodeId]

    if (DEBUG)
      console.log(nextChildIndex, ((nextChildIndex + 1) % numChildren) - 1)

    if (framesSinceLast === 0) {
      animationNode.children[nextChildIndex].visible = false
      animationNode.children[(nextChildIndex + 1) % numChildren].visible = true
    }

    if (DEBUG) console.log(currentAnimations[nodeId])

    currentAnimations[nodeId] = {
      framesSinceLast: (framesSinceLast + 1) % ANIMATE_ONCE_EVERY_N_FRAMES,
      nextChildIndex:
        framesSinceLast === 0
          ? (nextChildIndex + 1) % numChildren
          : nextChildIndex,
      numChildren,
      animationNode
    }
  }
}
