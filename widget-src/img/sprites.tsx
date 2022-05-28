import greendown0 from './green/basic-down-0.png'
import greenleft0 from './green/basic-left-0.png'
import greenright0 from './green/basic-right-0.png'
import greenup0 from './green/basic-up-0.png'
import greendown1 from './green/basic-down-1.png'
import greenleft1 from './green/basic-left-1.png'
import greenright1 from './green/basic-right-1.png'
import greenup1 from './green/basic-up-1.png'

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
import { Facing } from '../lib'

type CharacterSprites = {[T in Facing]: string[]}
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
    right: [blueright0, blueright1],
  }
}

export const guy: Character = {
  name: 'Guy by Laura Pang',
  sprites: {
    up: [guyup0, guyup1],
    down: [guydown0, guydown1],
    left: [guyleft0, guyleft1],
    right: [guyright0, guyright1],
  }
}

export const allCharacters = [
  blueLink,
  guy
]

export function getSprite(
  facing: Facing,
  lastSpriteIndex: number,
  wardrobeIndex: number,
): string {
  const characterSpritesFacing = allCharacters[wardrobeIndex].sprites[facing]
  const frameIndex = Math.floor((lastSpriteIndex % 12) * characterSpritesFacing.length / 12)
  return characterSpritesFacing[frameIndex]
}
