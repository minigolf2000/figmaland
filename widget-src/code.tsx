const { widget } = figma
const { useSyncedState, useSyncedMap, usePropertyMenu, useWidgetId } = widget
import { bikeZone } from './bike_zone'
import down0 from './img/basic-down-0.png'
import { Facing, toRect } from './lib'
const { AutoLayout, Ellipse, Frame, Image, Rectangle, SVG, Text } = widget
import {
  getFacingFromMovementDirection,
  getMovementDirectionVector,
  getSprite,
  movement
} from './movement'
import { proximityAnimations } from './proximity_animations'
import { distance, midpoint } from './vector'
import { outfits, wardrobe, wardrobePropertyMenuItem } from './wardrobe'

export const DEBUG = false // Add options to debug the widget

const FPS = 30
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
  const proximityAnimationNodes = nodes.filter(
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
  proximityAnimations(widgetNode.id,toRect(widgetNode), proximityAnimationNodes)
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

  const propertyMenu: WidgetPropertyMenuItem[] = inWardrobe ? [wardrobePropertyMenuItem(wardrobeIndex)] : []
  usePropertyMenu(propertyMenu, ({ propertyName, propertyValue }) => {
    setWardrobeIndex(outfits.findIndex((o) => o.option === propertyValue))
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

  return (
      <Image
      onClick={activate}
        width={64}
        height={64}
        src={getSprite(facing, lastSpriteIndex, wardrobeIndex)}
      />
  )
}
widget.register(Widget)

// how to respond to selection change
