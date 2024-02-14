import { CharacterClass } from 'src/domain/entities/CharacterClass'

export interface CharacterClassCreaterParams {
  name: string
}

export interface CharacterClassCreater {
  create: (params: CharacterClassCreaterParams) => Promise<CharacterClass>
}
