import { CharacterClass } from 'domain/entities/CharacterClass'
import { CharacterClassCreaterParams } from 'domain/useCases/CharacterClassCreater'

export interface CharacterClassCreaterRepoParams
  extends CharacterClassCreaterParams {}

export interface CharacterClassCreaterRepo {
  create(params: CharacterClassCreaterRepoParams): Promise<CharacterClass>
}
