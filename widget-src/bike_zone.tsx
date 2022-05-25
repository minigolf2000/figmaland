import { DEBUG } from './code'
import { isOverlapping } from './lib'
import { setMovementMode, MovementMode } from './movement'

// Proximity animations will loop an animation when a
// player is nearby
const ANIMATE_ONCE_EVERY_N_FRAMES = 5

export function bikeZone(
  characterRect: WidgetNode,
  bikeZoneRects: SceneNode[]
) {
  for (const a of bikeZoneRects) {
    console.log(bikeZoneRects)
    if (isOverlapping(characterRect, a)) {
      setMovementMode(MovementMode.Bicycle)
    } else {
      setMovementMode(MovementMode.Foot)
    }
  }
}
