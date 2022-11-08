const { widget } = figma
const { Image, Frame, useSyncedState, usePropertyMenu } = widget
import { bikeZone } from './bike_zone_🚲'
import {
  selectableCharacters,
  getCharacter,
  getFrameIndex,
  BikeFrontNodes,
  BikeBackNodes
} from './img/sprites'
import { Facing, toRect } from './lib'
import { movement, MovementMode, movementMode } from './movement_🛑'
import { animatedArt } from './animated_art_⏱'
import { midpoint } from './vector'
import { home, homePropertyMenuItem } from './home_🏠'
import { subway } from './subway_🚇'

const FPS = 30

// These cached values are read within the `activate` function. If we don't cache it,
// the usedSyncedState values within the context of that function are always stale
// and have the same value when the widget originally started running
let cachedLastSpriteIndex = 0
let cachedFrameIndex = 0
let cachedCharacterIndex = 0
let cachedFacing: Facing = 'down'

// TODO: do we need to quadtree this stuff, or just iterate thru all nodes for now
const animatedArtNodes: (FrameNode | GroupNode)[] = []
const animatedArtRects: Rect[] = []
const animatedArtIds: string[] = []
const collisionRects: Rect[] = []
const homeRects: Rect[] = []
const bikeZoneRects: Rect[] = []
const subwayRects: { [line: string]: { in?: Rect; out?: Rect } } = {}

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
      bikeZoneRects.push(toRect(n))
    }
    if (nodeName.slice(0, 2) === '🚇') {
      const line = nodeName[2]
      if (!subwayRects[line]) {
        subwayRects[line] = {}
      }
      if (nodeName.slice(3, 6) === 'out') {
        subwayRects[line].out = toRect(n)
      } else {
        subwayRects[line].in = toRect(n)
      }
    }
  }
}

function Widget() {
  const widgetId = widget.useWidgetId()
  const [characterIndex, setCharacterIndex] = useSyncedState<number>(
    'characterIndex',
    0
  )
  cachedCharacterIndex = characterIndex
  const [atHome, setAtHome] = useSyncedState<boolean>('atHome', false)
  const [frameIndex, setFrameIndex] = useSyncedState<number>('frameIndex', 0)

  const propertyMenu: WidgetPropertyMenuItem[] = atHome
    ? [homePropertyMenuItem(characterIndex)]
    : []
  usePropertyMenu(propertyMenu, ({ propertyValue }) => {
    const newCharacterIndex = selectableCharacters.findIndex(
      (c) => c.name === propertyValue
    )
    setCharacterIndex(newCharacterIndex)
    setFacing(
      getCharacter(newCharacterIndex).sprites.down.length > 0 ? 'down' : 'right'
    )
  })

  const character = getCharacter(characterIndex)
  const [facing, setFacing] = useSyncedState<Facing>(
    'facing',
    character.sprites.down.length > 0 ? 'down' : 'right'
  )
  cachedFacing = facing

  const activate = () => {
    const widgetNode = figma.getNodeById(widgetId) as WidgetNode
    if (widgetNode) {
      figma.currentPage.selection = [widgetNode]
    }

    if (widgetNode.locked) {
      const lockedClone = widgetNode.cloneWidget({})
      widgetNode.locked = false
      figma.currentPage.appendChild(lockedClone)
    } else if (widgetNode.parent !== figma.currentPage) {
      const rect = toRect(widgetNode)
      figma.currentPage.appendChild(widgetNode)
      widgetNode.x = rect.x
      widgetNode.y = rect.y
    }

    if (figma.viewport.zoom > 1) {
      figma.viewport.zoom = 1
    }
    figma.viewport.center = midpoint(widgetNode) // update camera
    gatherNodes()
    const index = figma.currentPage.children.findIndex(
      // Support '--- running widgets ---' for backwards compat
      (n) => n.name[0] === '↔' || n.name === '--- running widgets ---'
    )
    if (index !== -1) widgetNode.parent?.insertChild(index, widgetNode)

    const myInterval = setInterval(() => {
      const widgetRect = toRect(widgetNode)
      const characterHasUpDownSprites = character.sprites.down.length > 0

      // Character gets deselected. Exit
      if (figma.currentPage.selection.toString() !== [widgetNode].toString()) {
        setFacing(characterHasUpDownSprites ? 'down' : 'right')
        figma.closePlugin()
        return
      }

      cachedLastSpriteIndex = movement({
        widgetNode,
        widgetRect,
        setFacing,
        lastSpriteIndex: cachedLastSpriteIndex,
        collisionRects,
        characterHasUpDownSprites
      })
      const fi = getFrameIndex(
        cachedLastSpriteIndex,
        getCharacter(cachedCharacterIndex).sprites[cachedFacing].length
      )

      if (fi !== cachedFrameIndex) {
        cachedFrameIndex = fi
        setFrameIndex(fi)
      }

      animatedArt(
        widgetId,
        widgetRect,
        animatedArtNodes,
        animatedArtRects,
        animatedArtIds
      )
      bikeZone(widgetRect, bikeZoneRects)
      home(widgetRect, homeRects, setAtHome)
      subway(subwayRects, widgetRect, widgetNode)
    }, 1000 / FPS)

    figma.on('close', () => {
      clearInterval(myInterval)
      widgetNode.parent?.insertChild(
        widgetNode.parent.children.length,
        widgetNode
      )
    })

    return new Promise<void>(() => {})
  }

  let frameHeight = 64
  if (movementMode === MovementMode.Bicycle) frameHeight += 64
  if (character.isTall) frameHeight += 64
  // Render all the <Image /> tags for a character
  // Use visibility to toggle which is visible, to avoid a
  // memory leak / race condition in Fullscreen image loading code
  return (
    <Frame
      width={movementMode === MovementMode.Bicycle ? 128 : 64}
      height={frameHeight}
      onClick={activate}
    >
      {BikeBackNodes(facing, frameIndex, !!character.isTall)}
      {(['up', 'down', 'left', 'right'] as Facing[]).map((f: Facing) =>
        character.sprites[f].map((src: string, i: number) => (
          <Image
            x={movementMode === MovementMode.Bicycle ? 32 : 0}
            y={
              movementMode === MovementMode.Bicycle
                ? facing === 'up' || facing === 'down'
                  ? 32
                  : 16
                : 0
            }
            key={`${f}-${i}`}
            width={64}
            height={character.isTall ? 128 : 64}
            src={src}
            hidden={
              facing !== f ||
              (movementMode === MovementMode.Bicycle ? 0 : frameIndex) !== i
            }
          />
        ))
      )}
      {BikeFrontNodes(facing, frameIndex, !!character.isTall)}
    </Frame>
  )
}
widget.register(Widget)
