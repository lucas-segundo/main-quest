import { CharacterClassCreaterRepo } from 'app/interfaces/CharacterClassCreaterRepository'
import { CharacterClass } from 'domain/entities/CharacterClass'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import {
  CharacterClassCreater,
  CharacterClassCreaterParams,
} from 'domain/useCases/CharacterClassCreater'

export class CharacterClassCreaterImpl implements CharacterClassCreater {
  constructor(private characterClassCreaterRepo: CharacterClassCreaterRepo) {}

  async create(params: CharacterClassCreaterParams): Promise<CharacterClass> {
    try {
      const createdCharacterClass =
        await this.characterClassCreaterRepo.create(params)

      return createdCharacterClass
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
