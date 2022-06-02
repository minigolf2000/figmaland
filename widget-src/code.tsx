const { widget } = figma
const { Image, Frame, useSyncedState, usePropertyMenu } = widget
import { bikeZone } from './bike_zone_🚲'
import {
  allCharacters,
  getCharacterSprites,
  getFrameIndex
} from './img/sprites'
import { Facing, toRect } from './lib'
import { movement } from './movement_🛑'
import { animatedArt } from './animated_art_⏱'
import { midpoint } from './vector'
import { wardrobe, wardrobePropertyMenuItem } from './wardrobe_🏠'

export const DEBUG = false // Add options to debug the widget

const FPS = 30

// How does the char know to alternate steps at all if this is not useSyncedState?
let lastSpriteIndex = 0

function nextFrame(props: {
  widgetNode: WidgetNode
  setFacing: (facing: Facing) => void
  inWardrobe: boolean
  setInWardrobe: (inWardrobe: boolean) => void
}) {
  const { widgetNode, setFacing, inWardrobe, setInWardrobe } = props
  const widgetRect = toRect(widgetNode)
  const nodes = figma.currentPage.findAll(() => true)
  const animatedArtNodes = nodes.filter(
    (n) => n.name[0] === '⏱' && ['FRAME', 'GROUP'].includes(n.type)
  ) as (FrameNode | GroupNode)[]
  const collisionNodes = nodes.filter((n) => n.name.slice(0, 2) === '🛑')
  const wardrobeNodes = nodes.filter((n) => n.name.slice(0, 2) === '🏠')
  const bikeZoneNodes = nodes.filter((n) => n.name.slice(0, 2) === '🚲')

  lastSpriteIndex = movement({
    widgetNode,
    widgetRect,
    setFacing,
    lastSpriteIndex,
    collisionNodes
  })
  animatedArt(widgetNode.id, toRect(widgetNode), animatedArtNodes)
  bikeZone(widgetRect, bikeZoneNodes)
  wardrobe(widgetRect, wardrobeNodes, inWardrobe, setInWardrobe)
}

function Widget() {
  // todo: if wardrobeIndex == -1, create a node that spawns widgets?
  const widgetId = widget.useWidgetId()
  const [wardrobeIndex, setWardrobeIndex] = useSyncedState<number>(
    'wardrobeIndex',
    0
  )
  const [inWardrobe, setInWardrobe] = useSyncedState<boolean>(
    'inWardrobe',
    false
  )

  const propertyMenu: WidgetPropertyMenuItem[] = inWardrobe
    ? [wardrobePropertyMenuItem(wardrobeIndex)]
    : []
  usePropertyMenu(propertyMenu, ({ propertyValue }) => {
    setWardrobeIndex(allCharacters.findIndex((c) => c.name === propertyValue))
  })

  const [facing, setFacing] = useSyncedState<Facing>('facing', 'down')

  const activate = () => {
    const widgetNode = figma.getNodeById(widgetId) as WidgetNode
    if (widgetNode) {
      figma.currentPage.selection = [widgetNode]
    }

    figma.viewport.center = midpoint(widgetNode) // update camera
    setInterval(() => {
      nextFrame({ widgetNode, setFacing, inWardrobe, setInWardrobe })
    }, 1000 / FPS)
    return new Promise<void>(() => {})
  }

  const characterSprites = getCharacterSprites(wardrobeIndex)

  const frameIndex = getFrameIndex(
    lastSpriteIndex,
    characterSprites[facing].length
  )

  return (
    <Frame width={64} height={64} onClick={activate}>
      <Image
        width={64}
        height={64}
        src={characterSprites.up[0]}
        hidden={facing !== 'up' || frameIndex !== 0}
      />
      <Image
        width={64}
        height={64}
        src={characterSprites.up[1]}
        hidden={facing !== 'up' || frameIndex !== 1}
      />
      <Image
        width={64}
        height={64}
        src={characterSprites.down[0]}
        hidden={facing !== 'down' || frameIndex !== 0}
      />
      <Image
        width={64}
        height={64}
        src={characterSprites.down[1]}
        hidden={facing !== 'down' || frameIndex !== 1}
      />
      <Image
        width={64}
        height={64}
        src={characterSprites.left[0]}
        hidden={facing !== 'left' || frameIndex !== 0}
      />
      <Image
        width={64}
        height={64}
        src={characterSprites.left[1]}
        hidden={facing !== 'left' || frameIndex !== 1}
      />
      <Image
        width={64}
        height={64}
        src={characterSprites.right[0]}
        hidden={facing !== 'right' || frameIndex !== 0}
      />
      <Image
        width={64}
        height={64}
        src={characterSprites.right[1]}
        hidden={facing !== 'right' || frameIndex !== 1}
      />
    </Frame>
  )
}
widget.register(Widget)

// how to respond to selection change
