import { Facing } from '../lib'
import { MovementMode, movementMode } from '../movement_🛑'

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

import bluedown0 from './blue/basic-down-0.png'
import blueleft0 from './blue/basic-left-0.png'
import blueright0 from './blue/basic-right-0.png'
import blueup0 from './blue/basic-up-0.png'
import bluedown1 from './blue/basic-down-1.png'
import blueleft1 from './blue/basic-left-1.png'
import blueright1 from './blue/basic-right-1.png'
import blueup1 from './blue/basic-up-1.png'

import guydown0 from './guy1/basic-down-0.png'
import guyleft0 from './guy1/basic-left-0.png'
import guyright0 from './guy1/basic-right-0.png'
import guyup0 from './guy1/basic-up-0.png'
import guydown1 from './guy1/basic-down-1.png'
import guyleft1 from './guy1/basic-left-1.png'
import guyright1 from './guy1/basic-right-1.png'
import guyup1 from './guy1/basic-up-1.png'

type CharacterSprites = { [T in Facing]: string[] }
interface Character {
  name: string
  sprites: CharacterSprites
}

export const blueLink: Character = {
  name: 'Link',
  sprites: {
    up: [blueup0, blueup1],
    down: [bluedown0, bluedown1],
    left: [blueleft0, blueleft1],
    right: [blueright0, blueright1]
  }
}

export const guy: Character = {
  name: 'Guy by Laura Pang',
  sprites: {
    up: [guyup0, guyup1],
    down: [guydown0, guydown1],
    left: [guyleft0, guyleft1],
    right: [guyright0, guyright1]
  }
}

const bike: Character = {
  name: '',
  sprites: {
    up: [bikeup1, bikeup2, bikeup1, bikeup3],
    down: [bikedown1, bikedown2, bikedown1, bikedown3],
    left: [bikeleft1, bikeleft2],
    right: [bikeright1, bikeright2]
  }
}

export const allCharacters = [blueLink, guy]

export function getCharacterSprites(wardrobeIndex: number) {
  const character =
    movementMode === MovementMode.Bicycle ? bike : allCharacters[wardrobeIndex]
  return character.sprites
}

export function getFrameIndex(
  lastSpriteIndex: number,
  characterSpritesFacingLength: number
) {
  return Math.floor(
    ((lastSpriteIndex % 12) * characterSpritesFacingLength) / 12
  )
}
