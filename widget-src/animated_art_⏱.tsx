import { isOverlapping } from './lib'

// Animated art loops an animation when a
// player is nearby
const ANIMATE_ONCE_EVERY_N_FRAMES = 5

export function animatedArt(
  widgetId: string,
  characterRect: Rect,
  animatedArtNodes: (FrameNode | GroupNode)[],
  animatedArtRects: Rect[],
  animatedArtIds: string[]
) {
  addOrRemoveAnimations(
    widgetId,
    characterRect,
    animatedArtNodes,
    animatedArtRects,
    animatedArtIds
  )
  incrementAnimations()
}

function addOrRemoveAnimations(
  widgetId: string,
  characterRect: Rect,
  animatedArtNodes: (FrameNode | GroupNode)[],
  animatedArtRects: Rect[],
  animatedArtIds: string[]
) {
  for (let i = 0; i < animatedArtRects.length; i++) {
    const aRect = animatedArtRects[i]
    const a = animatedArtNodes[i]
    if (isOverlapping(characterRect, aRect)) {
      if (!!a.getPluginData('animation')) {
        continue
      }
      const numAnimationFrames = a.children.length - 1
      if (numAnimationFrames < 1) {
        continue
      }
      // TODO: implement multiplayer safety
      a.setPluginData(
        'animation',
        JSON.stringify({
          id: widgetId,
          timestamp: Math.round(Date.now() / 1000)
        })
      )

      let isFirstChild = true
      for (const c of a.children) {
        if (!isFirstChild) {
          c.visible = false
        }
        isFirstChild = false
      }

      currentAnimations[a.id] = {
        framesSinceLast: 0,
        nextChildIndex: 1,
        numAnimationFrames,
        animationNode: a
      }
    } else if (
      currentAnimations[animatedArtIds[i]] &&
      a.getPluginData('animation')
    ) {
      a.children[currentAnimations[animatedArtIds[i]].nextChildIndex].visible =
        false
      a.children[a.children.length - 1].visible = true
      delete currentAnimations[animatedArtIds[i]]
      a.setPluginData('animation', '')
    }
  }
}

interface AnimationState {
  framesSinceLast: number
  nextChildIndex: number
  numAnimationFrames: number
  animationNode: FrameNode | GroupNode
}
let currentAnimations: { [nodeId: string]: AnimationState } = {}

function incrementAnimations() {
  for (const nodeId of Object.keys(currentAnimations)) {
    const {
      framesSinceLast,
      nextChildIndex,
      numAnimationFrames,
      animationNode
    } = currentAnimations[nodeId]

    if (framesSinceLast === 0) {
      animationNode.children[nextChildIndex].visible = false
      animationNode.children[
        (nextChildIndex + 1) % numAnimationFrames
      ].visible = true
    }

    currentAnimations[nodeId] = {
      framesSinceLast: (framesSinceLast + 1) % ANIMATE_ONCE_EVERY_N_FRAMES,
      nextChildIndex:
        framesSinceLast === 0
          ? (nextChildIndex + 1) % numAnimationFrames
          : nextChildIndex,
      numAnimationFrames,
      animationNode
    }
  }
}

// TODO(golf): this will probably crash if animated art nodes are edited while widget is running. This is fine

figma.on('close', () => {
  for (const nodeId of Object.keys(currentAnimations)) {
    currentAnimations[nodeId].animationNode.setPluginData('animation', '')
    currentAnimations[nodeId].animationNode.children[
      currentAnimations[nodeId].nextChildIndex
    ].visible = false
    currentAnimations[nodeId].animationNode.children[
      currentAnimations[nodeId].animationNode.children.length - 1
    ].visible = true
  }
})
