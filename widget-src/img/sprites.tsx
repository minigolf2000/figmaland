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

export const selectableCharacters = [guy, girl, sheriff, robber, totoro, yeti]

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

export function BikeBackNodes(facing: Facing, frameIndex: number) {
  return (
    <>
      <Image
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

export function BikeFrontNodes(facing: Facing, frameIndex: number) {
  return (
    <>
      <Image
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
