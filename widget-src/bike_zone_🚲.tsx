import { isOverlapping } from './lib'
import { setMovementMode, MovementMode } from './movement_🛑'

export function bikeZone(
  characterRect: Rect,
  bikeZoneRects: SceneNode[]
) {
  for (const a of bikeZoneRects) {
    if (isOverlapping(characterRect, a)) {
      setMovementMode(MovementMode.Bicycle)
    } else {
      setMovementMode(MovementMode.Foot)
    }
  }
}
