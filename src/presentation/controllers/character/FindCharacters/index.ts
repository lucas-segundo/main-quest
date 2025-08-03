import { FindCharactersService } from 'domain/entities/Character/services/FindCharacters'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'

export interface FindCharactersControllerParams {
  name?: {
    lk?: string
  }
}

export class FindCharactersController implements Controller {
  constructor(
    private readonly findCharactersRepo: FindCharactersService,
    private readonly httpErrorHandler: HTTPErrorHandler,
    private readonly dataValidator: DataValidator,
  ) {}

  async handle(
    params: FindCharactersControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithCharacters(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithCharacters(params: FindCharactersControllerParams) {
    const classes = await this.findCharactersRepo.find({
      filter: {
        name: {
          lk: params.name?.lk,
        },
      },
    })

    return {
      data: classes,
      statusCode: HTTPStatusCode.OK,
    }
  }
}
