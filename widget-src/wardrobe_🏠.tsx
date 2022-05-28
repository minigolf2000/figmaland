import { allCharacters } from "./img/sprites"
import { isOverlapping } from "./lib"

export function wardrobe(
  characterRect: Rect,
  wardrobeRects: SceneNode[],
  inWardrobe: boolean,
  setInWardrobe: (inWardrobe: boolean) => void
) {
  const isNowInWardrobe = wardrobeRects.some(r => isOverlapping(characterRect, r))
  if (isNowInWardrobe && !inWardrobe) {
    setInWardrobe(true)
  }
  if (!isNowInWardrobe && inWardrobe) {
    setInWardrobe(false)
  }
}

export function wardrobePropertyMenuItem(
  wardrobeIndex: number
): WidgetPropertyMenuItem {
  return {
    itemType: 'dropdown',
    propertyName: 'cardColor',
    tooltip: 'Change character',
    selectedOption: allCharacters[wardrobeIndex].name,
    options: allCharacters.map(c => ({option: c.name, label: c.name}))
  }
}
