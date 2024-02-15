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
      response = await this.createCharacterClass(params)
    } catch (error) {
      response = this.handleError(error)
    } finally {
      return response
    }
  }

  private async createCharacterClass(
    params: CharacterClassCreaterControllerParams,
  ) {
    const createdCharacterClass = await this.characterClassCreater.create(
      params.data,
    )

    return {
      statusCode: 201,
      data: createdCharacterClass,
    }
  }

  private handleError(error: Error) {
    return {
      statusCode: 500,
      errors: [error.message],
    }
  }
}
