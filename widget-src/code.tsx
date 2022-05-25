const { widget } = figma
const { useSyncedState, useSyncedMap, usePropertyMenu, useWidgetId } = widget
import down0 from './img/basic-down-0.png'
import { Facing } from './lib'
const { AutoLayout, Ellipse, Frame, Image, Rectangle, SVG, Text } = widget
import {
  getFacingFromMovementDirection,
  getMovementDirectionVector,
  getSprite,
  MOVEMENT_SPEED,
  updateCamera
} from './movement'
import { useStickableAnimation } from './stickable_animation'
import { distance, midpoint } from './vector'
import { outfits, useWardrobe, Wardrobe } from './wardrobe'

const DEBUG = true // Add options to debug the widget

const FPS = 30
let myInterval: number
let lastSpriteIndex = 0

type Route = 'character' | 'spawner' | 'wardrobe' | 'animation'

function Widget() {
  const [route, setRoute] = useSyncedState<Route>('route', 'character')
  switch (route) {
    case 'character':
      return <Character />
    // case 'spawner':
    //   return <Spawner />
    case 'wardrobe':
      return <Wardrobe />
    // case 'spawner':
    //   return <Animation />
  }
}

function Character() {
  const widgetId = widget.useWidgetId()
  const [wardrobeIndex, setWardrobeIndex] = useSyncedState<number>(
    'wardrobe',
    0
  )

  let propertyMenu: WidgetPropertyMenuItem[] = []
  if (DEBUG) {
    propertyMenu = [
      {
        itemType: 'action',
        propertyName: 'route',
        tooltip: 'Create a wardrobe'
      }
    ]
  }
  useWardrobe(wardrobeIndex, propertyMenu)

  usePropertyMenu(propertyMenu, ({ propertyName, propertyValue }) => {
    if (propertyName === 'route') {
      const widgetNode = figma.getNodeById(widgetId) as WidgetNode
      if (widgetNode) {
        figma.currentPage.selection = [widgetNode]
      }
      const wardrobe = widgetNode.cloneWidget({ route: 'wardrobe' })
      wardrobe.setPluginData('figma-gather-route', 'wardrobe')
    }
    setWardrobeIndex(outfits.findIndex((o) => o.option === propertyValue))
  })

  const [facing, setFacing] = useSyncedState<Facing>('facing', 'down')

  // useStickableAnimation()

  const activate = () => {
    const widgetNode = figma.getNodeById(widgetId) as WidgetNode
    if (widgetNode) {
      figma.currentPage.selection = [widgetNode]
    }

    updateCamera(widgetNode)
    myInterval = setInterval(() => {
      if (
        distance(figma.viewport.center, midpoint(widgetNode)) > MOVEMENT_SPEED
      ) {
        figma.currentPage.selection = []
        setFacing('down')
        figma.closePlugin(
          'Stopping character movement to allow free camera. Click character to resume'
        )
        clearInterval(myInterval)
        return
      }
      if (figma.currentPage.selection.toString() !== [widgetNode].toString()) {
        clearInterval(myInterval)
        setFacing('down')
        figma.closePlugin(
          'Character is no longer selected and has stopped moving. Click character to resume'
        )
        return
      }

      // handle cursor position not found
      const movementDirection = getMovementDirectionVector(
        widgetNode,
        figma.activeUsers[0].position!
      )
      setFacing(getFacingFromMovementDirection(movementDirection))

      lastSpriteIndex = (lastSpriteIndex + 1) % 8
      widgetNode.x += movementDirection.x
      widgetNode.y += movementDirection.y
      updateCamera(widgetNode)
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
