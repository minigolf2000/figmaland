const { widget } = figma
const { AutoLayout, Ellipse, Frame, Image, Rectangle, SVG, Text } = widget
const {
  useSyncedState,
  useStickable,
  useStickableHost,
  usePropertyMenu,
  useWidgetId
} = widget

export const outfits: WidgetPropertyMenuColorSelectorOption[] = [
  { tooltip: 'green', option: '#80D010' },
  { tooltip: 'blue', option: '#0083FE' }
]

export function wardrobe(nodes: SceneNode[]) {
  // TODO: make this append property menu
}

export function useWardrobe(
  wardrobeIndex: number,
  propertyMenu: WidgetPropertyMenuItem[]
) {
  propertyMenu.push({
    itemType: 'color-selector',
    propertyName: 'cardColor',
    tooltip: 'Color',
    selectedOption: outfits[wardrobeIndex].option,
    options: outfits
  })
}
