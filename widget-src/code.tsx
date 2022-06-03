const { widget } = figma
const { Image, Frame, useSyncedState, usePropertyMenu } = widget
import { bikeZone } from './bike_zone_🚲'
import {
  selectableCharacters,
  getCharacterSprites,
  getFrameIndex
} from './img/sprites'
import { Facing, toRect } from './lib'
import { movement } from './movement_🛑'
import { animatedArt } from './animated_art_⏱'
import { midpoint } from './vector'
import { home, homePropertyMenuItem } from './home_🏠'

export const DEBUG = false // Add options to debug the widget

const FPS = 30

// How does the char know to alternate steps at all if this is not useSyncedState?
// If I try putting frameIndex in syncedState I see this error:
// in setSyncedState: Cannot call setSyncedState while widget is rendering.
let lastSpriteIndex = 0

// TODO: do we need to quadtree this stuff, or just iterate thru all nodes for now
const animatedArtNodes: (FrameNode | GroupNode)[] = []
const animatedArtRects: Rect[] = []
const animatedArtIds: string[] = []
const collisionRects: Rect[] = []
const homeRects: Rect[] = []
const bikeZoneRects: Rect[] = []

function gatherNodes() {
  const nodes = figma.currentPage.findAll(() => true)

  for (const n of nodes) {
    const nodeName = n.name
    if (nodeName[0] === '⏱') {
      animatedArtNodes.push(n as FrameNode | GroupNode)
      animatedArtRects.push(toRect(n))
      animatedArtIds.push(n.id)
    }
    if (nodeName.slice(0, 2) === '🛑') {
      collisionRects.push(toRect(n))
    }
    if (nodeName.slice(0, 2) === '🏠') {
      homeRects.push(toRect(n))
    }
    if (nodeName.slice(0, 2) === '🚲') {
      bikeZoneRects.push(n)
    }
  }
}

function Widget() {
  const widgetId = widget.useWidgetId()
  const [characterIndex, setCharacterIndex] = useSyncedState<number>(
    'characterIndex',
    0
  )
  const [atHome, setAtHome] = useSyncedState<boolean>('atHome', false)

  const propertyMenu: WidgetPropertyMenuItem[] = atHome
    ? [homePropertyMenuItem(characterIndex)]
    : []
  usePropertyMenu(propertyMenu, ({ propertyValue }) => {
    setCharacterIndex(
      selectableCharacters.findIndex((c) => c.name === propertyValue)
    )
  })

  const [facing, setFacing] = useSyncedState<Facing>('facing', 'down')

  const activate = () => {
    const widgetNode = figma.getNodeById(widgetId) as WidgetNode
    if (widgetNode) {
      figma.currentPage.selection = [widgetNode]
    }

    figma.viewport.center = midpoint(widgetNode) // update camera
    gatherNodes()

    setInterval(() => {
      const widgetRect = toRect(widgetNode)
      lastSpriteIndex = movement({
        widgetNode,
        widgetRect,
        setFacing,
        lastSpriteIndex,
        collisionRects
      })
      animatedArt(
        widgetId,
        widgetRect,
        animatedArtNodes,
        animatedArtRects,
        animatedArtIds
      )
      bikeZone(widgetRect, bikeZoneRects)
      home(widgetRect, homeRects, setAtHome)
    }, 1000 / FPS)
    return new Promise<void>(() => {})
  }

  const characterSprites = getCharacterSprites(characterIndex)

  const frameIndex = getFrameIndex(
    lastSpriteIndex,
    characterSprites[facing].length
  )

  // Render all the <Image /> tags for a character
  // Use visibility to toggle which is visible, to avoid a
  // memory leak / race condition in Fullscreen image loading code
  return (
    <Frame width={64} height={64} onClick={activate}>
      {(['up', 'down', 'left', 'right'] as Facing[]).map((f: Facing) =>
        characterSprites[f].map((src: string, i: number) => (
          <Image
            key={`${f}-${i}`}
            width={64}
            height={64}
            src={src}
            hidden={facing !== f || frameIndex !== i}
          />
        ))
      )}
    </Frame>
  )
}
widget.register(Widget)

// how to respond to selection change
