import { Facing } from '../lib'
import { MovementMode, movementMode } from '../movement_🛑'

type CharacterSprites = { [T in Facing]: string[] }
interface Character {
  name: string
  sprites: CharacterSprites
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

import bikeup1 from './bike/up-1.png'
import bikeup2 from './bike/up-2.png'
import bikeup3 from './bike/up-3.png'
import bikedown1 from './bike/down-1.png'
import bikedown2 from './bike/down-2.png'
import bikedown3 from './bike/down-3.png'
import bikeleft1 from './bike/left-1.png'
import bikeleft2 from './bike/left-2.png'
import bikeright1 from './bike/right-1.png'
import bikeright2 from './bike/right-2.png'

const bike: Character = {
  name: '',
  sprites: {
    up: [bikeup1, bikeup2, bikeup1, bikeup3],
    down: [bikedown1, bikedown2, bikedown1, bikedown3],
    left: [bikeleft1, bikeleft2],
    right: [bikeright1, bikeright2]
  }
}

export const selectableCharacters = [guy, girl, sheriff, robber, totoro]

export function getCharacterSprites(characterIndex: number) {
  return movementMode === MovementMode.Bicycle
    ? bike.sprites
    : selectableCharacters[characterIndex].sprites
}

export function getFrameIndex(
  lastSpriteIndex: number,
  characterSpritesFacingLength: number
) {
  return Math.floor(
    ((lastSpriteIndex % 12) * characterSpritesFacingLength) / 12
  )
}
