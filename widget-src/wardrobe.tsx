import wardrobeBG from './img/wardrobe.png'
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

export function useWardrobe(
  wardrobeIndex: number,
  propertyMenu: WidgetPropertyMenuItem[]
) {
  const widgetId = widget.useWidgetId()
  useStickable(() => {
    const widget = figma.getNodeById(widgetId) as WidgetNode
    const { stuckTo } = widget

    console.log('stuck')
    if (stuckTo?.getPluginData('figma-gather-route') === 'wardrobe') {
      console.log(outfits)
      propertyMenu.push({
        itemType: 'color-selector',
        propertyName: 'cardColor',
        tooltip: 'Color',
        selectedOption: outfits[wardrobeIndex].option,
        options: outfits
      })
    }
  })
}

export function Wardrobe() {
  useStickableHost(() => {
    console.log('hosterino')
  })
  return <Image width={512} height={512} src={wardrobeBG} />
}
