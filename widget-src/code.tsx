const { widget } = figma
const { useSyncedState } = widget
const { Image } = widget

import guydown0 from './img/guy1/basic-down-0.png'
import guyup0 from './img/guy1/basic-up-0.png'

const FPS = 60

function Widget() {
  const [facing, setFacing] = useSyncedState<string>('facing', 'down')

  const activate = () => {
    let i = 0
    setInterval(() => {
      setFacing(i % 2 === 0 ? 'up' : 'down')
      i++
    }, 1000 / FPS)
    return new Promise<void>(() => {})
  }

  return (
      <Image
        onClick={activate}
        width={64}
        height={64}
        src={facing === 'down' ? guydown0 : guyup0}
      />
  )
}
widget.register(Widget)
