import { CharacterClassCreaterRepo } from 'app/interfaces/CharacterClassCreaterRepository'
import { Logger } from 'app/interfaces/Logger'
import { CharacterClass } from 'domain/entities/CharacterClass'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import {
  CharacterClassCreater,
  CharacterClassCreaterParams,
} from 'domain/useCases/CharacterClassCreater'

export class CharacterClassCreaterImpl implements CharacterClassCreater {
  constructor(
    private characterClassCreaterRepo: CharacterClassCreaterRepo,
    private logger: Logger,
  ) {}

  async create(params: CharacterClassCreaterParams): Promise<CharacterClass> {
    try {
      const createdCharacterClass =
        await this.characterClassCreaterRepo.create(params)

      return createdCharacterClass
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: Error): void {
    this.logger.log({
      level: 'error',
      message: error.message,
      stack: error.stack,
    })
    throw new UnexpectedError()
  }
}
