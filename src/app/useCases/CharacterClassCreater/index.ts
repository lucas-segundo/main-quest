import { CharacterClassCreaterRepo } from 'app/interfaces/CharacterClassCreaterRepository'
import { CharacterClass } from 'domain/entities/CharacterClass'
import {
  CharacterClassCreater,
  CharacterClassCreaterParams,
} from 'domain/useCases/CharacterClassCreater'

export class CharacterClassCreaterImpl implements CharacterClassCreater {
  constructor(private characterClassCreaterRepo: CharacterClassCreaterRepo) {}

  async create(params: CharacterClassCreaterParams): Promise<CharacterClass> {
    const createdCharacterClass =
      await this.characterClassCreaterRepo.create(params)

    return createdCharacterClass
  }
}
