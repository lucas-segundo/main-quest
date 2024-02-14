import { CharacterClass } from 'src/domain/entities/CharacterClass'

export interface Params {
  name: string
}

export interface CharacterClassCreater {
  create: (params: Params) => Promise<CharacterClass>
}
