const { widget } = figma
const { Image } = widget
import { Facing } from '../lib'
import { MovementMode, movementMode } from '../movement_🛑'

type CharacterSprites = { [T in Facing]: string[] }
interface Character {
  name: string
  sprites: CharacterSprites
  isTall?: boolean
}

import girlback1 from './girl1/Girlback1.png'
import girlback2 from './girl1/Girlback2.png'
import girlfront1 from './girl1/Girlfront1.png'
import girlfront2 from './girl1/Girlfront2.png'
import girlleft1 from './girl1/Girlleft1.png'
import girlleft2 from './girl1/Girlleft2.png'
import girlright1 from './girl1/Girlright1.png'
import girlright2 from './girl1/Girlright2.png'

const girl: Character = {
  name: 'Some girl by Laura Pang',
  sprites: {
    up: [girlback1, girlback2],
    down: [girlfront1, girlfront2],
    left: [girlleft1, girlleft2],
    right: [girlright1, girlright2]
  }
}

import guydown0 from './guy1/basic-down-0.png'
import guyleft0 from './guy1/basic-left-0.png'
import guyright0 from './guy1/basic-right-0.png'
import guyup0 from './guy1/basic-up-0.png'
import guydown1 from './guy1/basic-down-1.png'
import guyleft1 from './guy1/basic-left-1.png'
import guyright1 from './guy1/basic-right-1.png'
import guyup1 from './guy1/basic-up-1.png'

const guy: Character = {
  name: 'Some Guy by Laura Pang',
  sprites: {
    up: [guyup0, guyup1],
    down: [guydown0, guydown1],
    left: [guyleft0, guyleft1],
    right: [guyright0, guyright1]
  }
}

import sheriffleft0 from './sheriff/left0.png'
import sheriffright0 from './sheriff/right0.png'
import sheriffleft1 from './sheriff/left1.png'
import sheriffright1 from './sheriff/right1.png'

const sheriff: Character = {
  name: 'Sheriff by Kenrick Rilee',
  sprites: {
    left: [sheriffleft0, sheriffleft1],
    right: [sheriffright0, sheriffright1],
    up: [],
    down: []
  }
}

import robberleft0 from './robber/left0.png'
import robberright0 from './robber/right0.png'
import robberleft1 from './robber/left1.png'
import robberright1 from './robber/right1.png'

const robber: Character = {
  name: 'Robber by Kenrick Rilee',
  sprites: {
    left: [robberleft0, robberleft1],
    right: [robberright0, robberright1],
    up: [],
    down: []
  }
}

import crowleft0 from './crow/left-0.png'
import crowright0 from './crow/right-0.png'
import crowleft1 from './crow/left-1.png'
import crowright1 from './crow/right-1.png'
import crowleft2 from './crow/left-2.png'
import crowright2 from './crow/right-2.png'

const crow: Character = {
  name: 'Crow by Lucy Huo',
  sprites: {
    left: [crowleft0, crowleft1, crowleft2],
    right: [crowright0, crowright1, crowright2],
    up: [],
    down: []
  }
}

import girldetectiveadown0 from './girl-detective-a/down-0.png'
import girldetectivealeft0 from './girl-detective-a/left-0.png'
import girldetectivearight0 from './girl-detective-a/right-0.png'
import girldetectiveaup0 from './girl-detective-a/up-0.png'
import girldetectiveadown1 from './girl-detective-a/down-1.png'
import girldetectivealeft1 from './girl-detective-a/left-1.png'
import girldetectivearight1 from './girl-detective-a/right-1.png'
import girldetectiveaup1 from './girl-detective-a/up-1.png'

const girlDetectiveA: Character = {
  name: 'Girl Detective A by Annie Chen',
  sprites: {
    up: [girldetectiveaup0, girldetectiveaup1],
    down: [girldetectiveadown0, girldetectiveadown1],
    left: [girldetectivealeft0, girldetectivealeft1],
    right: [girldetectivearight0, girldetectivearight1]
  }
}

import girldetectivebdown0 from './girl-detective-b/down-0.png'
import girldetectivebleft0 from './girl-detective-b/left-0.png'
import girldetectivebright0 from './girl-detective-b/right-0.png'
import girldetectivebup0 from './girl-detective-b/up-0.png'
import girldetectivebdown1 from './girl-detective-b/down-1.png'
import girldetectivebleft1 from './girl-detective-b/left-1.png'
import girldetectivebright1 from './girl-detective-b/right-1.png'
import girldetectivebup1 from './girl-detective-b/up-1.png'

const girlDetectiveB: Character = {
  name: 'Girl Detective B by Annie Chen',
  sprites: {
    up: [girldetectivebup0, girldetectivebup1],
    down: [girldetectivebdown0, girldetectivebdown1],
    left: [girldetectivebleft0, girldetectivebleft1],
    right: [girldetectivebright0, girldetectivebright1]
  }
}

import girldetectivecdown0 from './girl-detective-c/down-0.png'
import girldetectivecleft0 from './girl-detective-c/left-0.png'
import girldetectivecright0 from './girl-detective-c/right-0.png'
import girldetectivecup0 from './girl-detective-c/up-0.png'
import girldetectivecdown1 from './girl-detective-c/down-1.png'
import girldetectivecleft1 from './girl-detective-c/left-1.png'
import girldetectivecright1 from './girl-detective-c/right-1.png'
import girldetectivecup1 from './girl-detective-c/up-1.png'

const girlDetectiveC: Character = {
  name: 'Girl Detective C by Annie Chen',
  sprites: {
    up: [girldetectivecup0, girldetectivecup1],
    down: [girldetectivecdown0, girldetectivecdown1],
    left: [girldetectivecleft0, girldetectivecleft1],
    right: [girldetectivecright0, girldetectivecright1]
  }
}

import girldetectiveddown0 from './girl-detective-d/down-0.png'
import girldetectivedleft0 from './girl-detective-d/left-0.png'
import girldetectivedright0 from './girl-detective-d/right-0.png'
import girldetectivedup0 from './girl-detective-d/up-0.png'
import girldetectiveddown1 from './girl-detective-d/down-1.png'
import girldetectivedleft1 from './girl-detective-d/left-1.png'
import girldetectivedright1 from './girl-detective-d/right-1.png'
import girldetectivedup1 from './girl-detective-d/up-1.png'

const girlDetectiveD: Character = {
  name: 'Girl Detective D by Annie Chen',
  sprites: {
    up: [girldetectivedup0, girldetectivedup1],
    down: [girldetectiveddown0, girldetectiveddown1],
    left: [girldetectivedleft0, girldetectivedleft1],
    right: [girldetectivedright0, girldetectivedright1]
  }
}

import girldetectiveedown0 from './girl-detective-e/down-0.png'
import girldetectiveeleft0 from './girl-detective-e/left-0.png'
import girldetectiveeright0 from './girl-detective-e/right-0.png'
import girldetectiveeup0 from './girl-detective-e/up-0.png'
import girldetectiveedown1 from './girl-detective-e/down-1.png'
import girldetectiveeleft1 from './girl-detective-e/left-1.png'
import girldetectiveeright1 from './girl-detective-e/right-1.png'
import girldetectiveeup1 from './girl-detective-e/up-1.png'

const girlDetectiveE: Character = {
  name: 'Girl Detective E by Annie Chen',
  sprites: {
    up: [girldetectiveeup0, girldetectiveeup1],
    down: [girldetectiveedown0, girldetectiveedown1],
    left: [girldetectiveeleft0, girldetectiveeleft1],
    right: [girldetectiveeright0, girldetectiveeright1]
  }
}

import totorodown0 from './totoro/down-0.png'
import totoroleft0 from './totoro/left-0.png'
import totororight0 from './totoro/right-0.png'
import totoroup0 from './totoro/up-0.png'
import totorodown1 from './totoro/down-1.png'
import totoroleft1 from './totoro/left-1.png'
import totororight1 from './totoro/right-1.png'
import totoroup1 from './totoro/up-1.png'

const totoro: Character = {
  name: 'Totoro by Jessie Mao',
  sprites: {
    up: [totoroup0, totoroup1],
    down: [totorodown0, totorodown1],
    left: [totoroleft0, totoroleft1],
    right: [totororight0, totororight1]
  }
}

import totorodetectivedown0 from './totoro-detective/down-0.png'
import totorodetectiveleft0 from './totoro-detective/left-0.png'
import totorodetectiveright0 from './totoro-detective/right-0.png'
import totorodetectiveup0 from './totoro-detective/up-0.png'
import totorodetectivedown1 from './totoro-detective/down-1.png'
import totorodetectiveleft1 from './totoro-detective/left-1.png'
import totorodetectiveright1 from './totoro-detective/right-1.png'
import totorodetectiveup1 from './totoro-detective/up-1.png'

const totoroDetective: Character = {
  name: 'Totoro Detective by Jessie Mao',
  sprites: {
    up: [totorodetectiveup0, totorodetectiveup1],
    down: [totorodetectivedown0, totorodetectivedown1],
    left: [totorodetectiveleft0, totorodetectiveleft1],
    right: [totorodetectiveright0, totorodetectiveright1]
  }
}

import bodhidown0 from './bodhi/down-0.png'
import bodhileft0 from './bodhi/left-0.png'
import bodhiright0 from './bodhi/right-0.png'
import bodhiup0 from './bodhi/up-0.png'
import bodhidown1 from './bodhi/down-1.png'
import bodhileft1 from './bodhi/left-1.png'
import bodhiright1 from './bodhi/right-1.png'
import bodhiup1 from './bodhi/up-1.png'
import bodhileft2 from './bodhi/left-2.png'
import bodhiright2 from './bodhi/right-2.png'
import bodhileft3 from './bodhi/left-3.png'
import bodhiright3 from './bodhi/right-3.png'

const bodhi: Character = {
  name: 'Samoyed in Doc Martens by Lizhi Fan',
  sprites: {
    up: [bodhiup0, bodhiup1, bodhiup0, bodhiup1],
    down: [bodhidown0, bodhidown1, bodhidown0, bodhidown1],
    left: [bodhileft0, bodhileft1, bodhileft2, bodhileft3],
    right: [bodhiright0, bodhiright1, bodhiright2, bodhiright3]
  }
}

import doraemondown0 from './doraemon/down-0.png'
import doraemondown1 from './doraemon/down-1.png'
import doraemondown2 from './doraemon/down-2.png'
import doraemonleft0 from './doraemon/left-0.png'
import doraemonleft1 from './doraemon/left-1.png'
import doraemonright0 from './doraemon/right-0.png'
import doraemonright1 from './doraemon/right-1.png'
import doraemonup0 from './doraemon/up-0.png'
import doraemonup2 from './doraemon/up-2.png'
import doraemonup1 from './doraemon/up-1.png'

const doraemon: Character = {
  name: 'doraemon by Jessie Mao',
  sprites: {
    up: [doraemonup0, doraemonup1, doraemonup2, doraemonup1],
    down: [doraemondown0, doraemondown1, doraemondown2, doraemondown1],
    left: [doraemonleft0, doraemonleft1],
    right: [doraemonright0, doraemonright1]
  }
}

import yetileft0 from './yeti/left-0.png'
import yetileft1 from './yeti/left-1.png'
import yetileft2 from './yeti/left-2.png'
import yetileft3 from './yeti/left-3.png'
import yetiright0 from './yeti/right-0.png'
import yetiright1 from './yeti/right-1.png'
import yetiright2 from './yeti/right-2.png'
import yetiright3 from './yeti/right-3.png'

const yeti: Character = {
  name: 'Yeti by Kenrick Rilee',
  sprites: {
    up: [],
    down: [],
    left: [yetileft0, yetileft1, yetileft2, yetileft3],
    right: [yetiright0, yetiright1, yetiright2, yetiright3]
  },
  isTall: true
}

import pikachudown0 from './pikachu/down-0.png'
import pikachuleft0 from './pikachu/left-0.png'
import pikachuright0 from './pikachu/right-0.png'
import pikachuup0 from './pikachu/up-0.png'
import pikachudown1 from './pikachu/down-1.png'
import pikachuleft1 from './pikachu/left-1.png'
import pikachuright1 from './pikachu/right-1.png'
import pikachuup1 from './pikachu/up-1.png'

const pikachu: Character = {
  name: 'Pikachu by Annie Chen',
  sprites: {
    up: [pikachuup0, pikachuup1],
    down: [pikachudown0, pikachudown1],
    left: [pikachuleft0, pikachuleft1],
    right: [pikachuright0, pikachuright1]
  }
}

import bikedown0back from './bike/down-0-back.png'
import bikedown0front from './bike/down-0-front.png'
import bikedown1back from './bike/down-1-back.png'
import bikedown1front from './bike/down-1-front.png'
import bikeleft0 from './bike/left-0.png'
import bikeright0 from './bike/right-0.png'
import bikeleft1 from './bike/left-1.png'
import bikeright1 from './bike/right-1.png'
import bikeup0back from './bike/up-0-back.png'
import bikeup0front from './bike/up-0-front.png'
import bikeup1back from './bike/up-1-back.png'
import bikeup1front from './bike/up-1-front.png'

export const selectableCharacters = [
  guy,
  girl,
  sheriff,
  robber,
  totoro,
  yeti,
  doraemon,
  totoroDetective,
  bodhi,
  pikachu,
  crow,
  girlDetectiveA,
  girlDetectiveB,
  girlDetectiveC,
  girlDetectiveD,
  girlDetectiveE
]

export function getCharacter(characterIndex: number) {
  return selectableCharacters[characterIndex]
}

export function getFrameIndex(
  lastSpriteIndex: number,
  characterSpritesFacingLength: number
) {
  return Math.floor(
    ((lastSpriteIndex % 12) * characterSpritesFacingLength) / 12
  )
}

export function BikeBackNodes(
  facing: Facing,
  frameIndex: number,
  isTall: boolean
) {
  frameIndex = frameIndex % 2
  return (
    <>
      <Image
        y={isTall ? 64 : 0}
        src={bikedown0back}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'down' ||
          frameIndex !== 0
        }
        width={128}
        height={128}
      />
      <Image
        y={isTall ? 64 : 0}
        src={bikedown1back}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'down' ||
          frameIndex !== 1
        }
        width={128}
        height={128}
      />
      <Image
        y={isTall ? 64 : 0}
        src={bikeup0back}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'up' ||
          frameIndex !== 0
        }
        width={128}
        height={128}
      />
      <Image
        y={isTall ? 64 : 0}
        src={bikeup1back}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'up' ||
          frameIndex !== 1
        }
        width={128}
        height={128}
      />
    </>
  )
}

export function BikeFrontNodes(
  facing: Facing,
  frameIndex: number,
  isTall: boolean
) {
  frameIndex = frameIndex % 2
  return (
    <>
      <Image
        y={isTall ? 64 : 0}
        src={bikedown0front}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'down' ||
          frameIndex !== 0
        }
        width={128}
        height={128}
      />
      <Image
        y={isTall ? 64 : 0}
        src={bikedown1front}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'down' ||
          frameIndex !== 1
        }
        width={128}
        height={128}
      />
      <Image
        y={isTall ? 64 : 0}
        src={bikeup0front}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'up' ||
          frameIndex !== 0
        }
        width={128}
        height={128}
      />
      <Image
        y={isTall ? 64 : 0}
        src={bikeup1front}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'up' ||
          frameIndex !== 1
        }
        width={128}
        height={128}
      />
      <Image
        y={isTall ? 64 : 0}
        src={bikeleft0}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'left' ||
          frameIndex !== 0
        }
        width={128}
        height={128}
      />
      <Image
        y={isTall ? 64 : 0}
        src={bikeleft1}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'left' ||
          frameIndex !== 1
        }
        width={128}
        height={128}
      />
      <Image
        y={isTall ? 64 : 0}
        src={bikeright0}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'right' ||
          frameIndex !== 0
        }
        width={128}
        height={128}
      />
      <Image
        y={isTall ? 64 : 0}
        src={bikeright1}
        hidden={
          movementMode !== MovementMode.Bicycle ||
          facing !== 'right' ||
          frameIndex !== 1
        }
        width={128}
        height={128}
      />
    </>
  )
}
