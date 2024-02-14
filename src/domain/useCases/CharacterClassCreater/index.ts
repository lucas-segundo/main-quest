import { CharacterClass } from 'domain/entities/CharacterClass'

export interface CharacterClassCreaterParams {
  name: string
}

export interface CharacterClassCreater {
  create: (params: CharacterClassCreaterParams) => Promise<CharacterClass>
}
