const { widget } = figma
const { Image, Frame, useSyncedState } = widget

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
    <Frame width={64} height={64} onClick={activate}>
      <Image width={64} height={64} src={guydown0} hidden={facing !== 'down'} />
      <Image width={64} height={64} src={guyup0} hidden={facing !== 'up'} />
    </Frame>
  )
}
widget.register(Widget)
