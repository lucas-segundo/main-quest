import {
  CharacterClassCreater,
  CharacterClassCreaterParams,
} from 'domain/useCases/CharacterClassCreater'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface CharacterClassCreaterControllerParams {
  data: CharacterClassCreaterParams
}

export class CharacterClassCreaterController implements Controller {
  constructor(
    private readonly characterClassCreater: CharacterClassCreater,
    private readonly dataValidator: DataValidator,
  ) {}

  async handle(
    params: CharacterClassCreaterControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const validationResponse = await this.validateDataAndRespondIfHasErrors(
      params.data,
    )
    if (validationResponse) {
      return validationResponse
    }

    try {
      return await this.respondWithCreatedCharacterClass(params.data)
    } catch (error) {
      return this.respondWithHandledError(error)
    }
  }

  private async validateDataAndRespondIfHasErrors(
    data: CharacterClassCreaterParams,
  ): Promise<HTTPErrorResponse | undefined> {
    const { errors } = await this.dataValidator.validate(data)

    if (errors.length) {
      return {
        statusCode: 400,
        errors,
      }
    }
  }

  private async respondWithCreatedCharacterClass(
    data: CharacterClassCreaterParams,
  ) {
    const createdCharacterClass = await this.characterClassCreater.create(data)

    return {
      statusCode: 201,
      data: createdCharacterClass,
    }
  }

  private respondWithHandledError(error: Error) {
    return {
      statusCode: 500,
      errors: [error.message],
    }
  }
}
