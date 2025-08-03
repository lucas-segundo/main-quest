import { FindCharacterService } from 'domain/entities/Character/services/FindCharacter'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface FindCharacterControllerParams {
  id: string
}

export class FindCharacterController implements Controller {
  constructor(
    private readonly findCharacterRepo: FindCharacterService,
    private readonly httpErrorHandler: HTTPErrorHandler,
    private readonly dataValidator: DataValidator,
  ) {}

  async handle(
    params: FindCharacterControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

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
