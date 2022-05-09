const { widget } = figma
const {
  useSyncedState,
  useStickable,
  useSyncedMap,
  usePropertyMenu,
  useWidgetId
} = widget
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
import { useWardrobe } from './wardrobe'

const FPS = 30
let myInterval: number
let lastSpriteIndex = 0

function Widget() {
  const widgetId = widget.useWidgetId()
  const wardrobeIndex = useWardrobe()
  const [facing, setFacing] = useSyncedState<Facing>('facing', 'down')

  useStickableAnimation()

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
console.log('apowijf')
figma.on('timerstart', () => console.log('test'))

// how to respond to selection change
