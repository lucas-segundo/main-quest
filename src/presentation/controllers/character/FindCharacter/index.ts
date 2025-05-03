import {
  FindCharacterRepository,
  FindCharacterRepositoryParams,
} from 'entities/Character/repositories/FindCharacter'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindCharacterControllerParams
  extends FindCharacterRepositoryParams {}

export class FindCharacterController implements Controller {
  constructor(
    private readonly findCharacterRepo: FindCharacterRepository,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: FindCharacterControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      return await this.respondWithCharacter(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithCharacter(params: FindCharacterControllerParams) {
    const character = await this.findCharacterRepo.find(params)

    return {
      statusCode: 200,
      data: character,
    }
  }
}
