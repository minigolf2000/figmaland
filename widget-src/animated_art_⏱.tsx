// Animated art loops an animation when a player is nearby
// currentAnimations holds all running animations and metadata about how to update them

// TODO: there is a bug rn where if a player is within range of an animation
// and they close their tab before exiting the plugin, `animation` pluginData will
// be stuck on the animation node. And it will never animate again
// I think we can do something with timestamp here, like if we detect that an
// animation node hasn't been updated in 5s, just assume it's borked and is free
// to animate again
import { isOverlapping } from './lib'
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
const currentAnimations: { [nodeId: string]: AnimationState } = {}

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
