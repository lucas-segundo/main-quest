import {
  CharacterClassCreater,
  CharacterClassCreaterParams,
} from 'domain/useCases/CharacterClassCreater'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface CharacterClassCreaterControllerParams {
  data: CharacterClassCreaterParams
}

export class CharacterClassCreaterController implements Controller {
  constructor(private readonly characterClassCreater: CharacterClassCreater) {}

  async handle(
    params: CharacterClassCreaterControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    let response: HTTPResponse | HTTPErrorResponse

    try {
      response = await this.responseWithCreatedCharacterClass(params.data)
    } catch (error) {
      response = this.responseWithHandledError(error)
    } finally {
      return response
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
