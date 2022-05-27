import { isOverlapping } from "./lib"

export const outfits: WidgetPropertyMenuColorSelectorOption[] = [
  { tooltip: 'green', option: '#80D010' },
  { tooltip: 'blue', option: '#0083FE' }
]

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
    itemType: 'color-selector',
    propertyName: 'cardColor',
    tooltip: 'Color',
    selectedOption: outfits[wardrobeIndex].option,
    options: outfits
  }
}
