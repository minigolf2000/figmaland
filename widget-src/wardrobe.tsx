const { widget } = figma
const {
  useSyncedState,
  useStickable,
  useSyncedMap,
  usePropertyMenu,
  useWidgetId
} = widget

export const outfits: WidgetPropertyMenuColorSelectorOption[] = [
  { tooltip: 'green', option: '#80D010' },
  { tooltip: 'blue', option: '#0083FE' }
]

export function useWardrobe() {
  const [wardrobeIndex, setWardrobeIndex] = useSyncedState<number>(
    'wardrobe',
    0
  )

  usePropertyMenu(
    [
      {
        itemType: 'color-selector',
        propertyName: 'cardColor',
        tooltip: 'Color',
        selectedOption: outfits[wardrobeIndex].option,
        options: outfits
      }
    ],
    ({ propertyValue }) => {
      setWardrobeIndex(outfits.findIndex((o) => o.option === propertyValue))
    }
  )

  return wardrobeIndex
}
