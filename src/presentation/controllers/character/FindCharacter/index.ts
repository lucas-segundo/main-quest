import { FindCharacterService } from 'domain/entities/Character/services/FindCharacter'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindCharacterControllerParams {
  id: string
}

export class FindCharacterController implements Controller {
  constructor(
    private readonly findCharacterRepo: FindCharacterService,
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
    const character = await this.findCharacterRepo.find({
      filter: {
        id: {
          eq: params.id,
        },
      },
    })

    if (character) {
      return {
        statusCode: HTTPStatusCode.OK,
        data: character,
      }
    }

    return {
      statusCode: HTTPStatusCode.NOT_FOUND,
      data: character,
    }
  }
}
