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
    let response: HTTPResponse | HTTPErrorResponse

    response = await this.validateDataAndResponseIfHasErrors(params.data)

    if (response) {
      return response
    }

    try {
      response = await this.responseWithCreatedCharacterClass(params.data)
    } catch (error) {
      response = this.responseWithHandledError(error)
    } finally {
      return response
    }
  }

  private async validateDataAndResponseIfHasErrors(
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

  private async responseWithCreatedCharacterClass(
    data: CharacterClassCreaterParams,
  ) {
    const createdCharacterClass = await this.characterClassCreater.create(data)

    return {
      statusCode: 201,
      data: createdCharacterClass,
    }
  }

  private responseWithHandledError(error: Error) {
    return {
      statusCode: 500,
      errors: [error.message],
    }
  }
}
