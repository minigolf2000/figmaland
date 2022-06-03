import { selectableCharacters } from "./img/sprites"
import { isOverlapping } from "./lib"

let atHome = false
export function home(
  characterRect: Rect,
  homeRects: Rect[],
  setAtHome: (atHome: boolean) => void
) {
  const h = homeRects.some(r => isOverlapping(characterRect, r))
  if (h && !atHome) {
    atHome = true
    setAtHome(true)
  }
  if (!h && atHome) {
    atHome = false
    setAtHome(false)
  }
}

export function homePropertyMenuItem(
  characterIndex: number
): WidgetPropertyMenuItem {
  return {
    itemType: 'dropdown',
    propertyName: 'cardColor',
    tooltip: 'Change character',
    selectedOption: selectableCharacters[characterIndex].name,
    options: selectableCharacters.map(c => ({option: c.name, label: c.name}))
  }
}
