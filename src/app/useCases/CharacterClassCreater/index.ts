import { CharacterClassCreaterRepo } from 'app/interfaces/CharacterClassCreaterRepository'
import { CharacterClass } from 'domain/entities/CharacterClass'
import { mockCharacterClass } from 'domain/entities/CharacterClass/mock'
import {
  CharacterClassCreater,
  CharacterClassCreaterParams,
} from 'domain/useCases/CharacterClassCreater'

export class CharacterClassCreaterImpl implements CharacterClassCreater {
  constructor(private characterClassCreaterRepo: CharacterClassCreaterRepo) {}

  async create(params: CharacterClassCreaterParams): Promise<CharacterClass> {
    await this.characterClassCreaterRepo.create(params)

    return mockCharacterClass()
  }
}
