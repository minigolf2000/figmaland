const { widget } = figma
const { useSyncedState, useSyncedMap, usePropertyMenu, useWidgetId } = widget
import down0 from './img/basic-down-0.png'
import { Facing } from './lib'
const { AutoLayout, Ellipse, Frame, Image, Rectangle, SVG, Text } = widget
import {
  getFacingFromMovementDirection,
  getMovementDirectionVector,
  getSprite,
  movement,
} from './movement'
import { proximityAnimations } from './proximity_animations'
import { distance, midpoint } from './vector'
import { outfits, useWardrobe, wardrobe } from './wardrobe'

export const DEBUG = true // Add options to debug the widget

const FPS = 30
let lastSpriteIndex = 0

function nextFrame(props: {
  widgetNode: WidgetNode
  setFacing: (facing: Facing) => void
}) {
  const { widgetNode, setFacing } = props
  const nodes = figma.currentPage.findAll(() => true)
  const proximityAnimationNodes = nodes.filter(
    (n) => n.name[0] === '⏱' && ['FRAME', 'GROUP'].includes(n.type)
  ) as (FrameNode | GroupNode)[]
  const collisionNodes = nodes.filter((n) => n.name[0] === '🛑')
  const wardrobeNodes = nodes.filter((n) => n.name[0] === '🏠')
  console.log(proximityAnimationNodes)

  lastSpriteIndex = movement({ widgetNode, setFacing, lastSpriteIndex })
  proximityAnimations(widgetNode, proximityAnimationNodes)
  wardrobe(wardrobeNodes)
}

function Widget() {
  // todo: if wardrobeIndex == -1, create a node that spawns widgets?
  const widgetId = widget.useWidgetId()
  const [wardrobeIndex, setWardrobeIndex] = useSyncedState<number>(
    'wardrobe',
    0
  )

  let propertyMenu: WidgetPropertyMenuItem[] = []
  if (DEBUG) {
  }
  useWardrobe(wardrobeIndex, propertyMenu)

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
      nextFrame({ widgetNode, setFacing })
    }, 1000 / FPS)
    return new Promise<void>(() => {})
  }

  return (
    <AutoLayout
      direction="horizontal"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      padding={8}
      fill="#FFFFFF"
      cornerRadius={8}
      spacing={12}
      onClick={activate}
    >
      <Image
        width={64}
        height={64}
        src={getSprite(facing, lastSpriteIndex, wardrobeIndex)}
      />
    </AutoLayout>
  )
}
widget.register(Widget)

// how to respond to selection change
