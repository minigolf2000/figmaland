import { isOverlapping } from './lib'
import { setMovementMode, MovementMode } from './movement_🛑'

export function bikeZone(characterRect: Rect, bikeZoneRects: Rect[]) {
  if (bikeZoneRects.some((r) => isOverlapping(characterRect, r))) {
    setMovementMode(MovementMode.Bicycle)
  } else {
    setMovementMode(MovementMode.Foot)
  }
}
