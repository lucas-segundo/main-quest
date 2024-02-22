import { CharacterClassCreaterRepo } from 'app/interfaces/CharacterClassCreaterRepository'
import { ErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepository'
import { CharacterClass } from 'domain/entities/CharacterClass'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import {
  CharacterClassCreater,
  CharacterClassCreaterParams,
} from 'domain/useCases/CharacterClassCreater'

export class CharacterClassCreaterImpl implements CharacterClassCreater {
  constructor(
    private characterClassCreaterRepo: CharacterClassCreaterRepo,
    private errorLoggerRepo: ErrorLoggerRepo,
  ) {}

  async create(params: CharacterClassCreaterParams): Promise<CharacterClass> {
    try {
      return await this.createCharacterClass(params)
    } catch (error) {
      this.handleError(error)
    }
  }

  private async createCharacterClass(
    params: CharacterClassCreaterParams,
  ): Promise<CharacterClass> {
    const createdCharacterClass = await this.characterClassCreaterRepo.create(
      params,
    )

    return createdCharacterClass
  }

  private handleError(error: Error): never {
    this.errorLoggerRepo.log({
      error: error,
    })
    throw new UnexpectedError()
  }
}
