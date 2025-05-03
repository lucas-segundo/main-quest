import {
  FindCharactersRepository,
  FindCharactersRepositoryParams,
} from 'entities/Character/repositories/FindCharacters'
import { RequiredParamError } from 'app/errors/RequiredParamError'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPError,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindCharactersControllerParams
  extends FindCharactersRepositoryParams {}

export class FindCharactersController implements Controller {
  constructor(
    private readonly findCharactersRepo: FindCharactersRepository,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params?: FindCharactersControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const validationErrors = this.validate(params)
    if (validationErrors.length) {
      return {
        errors: validationErrors,
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithCharacters(
        params as FindCharactersRepositoryParams,
      )
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private validate(params?: FindCharactersControllerParams) {
    const validationErrors: HTTPError[] = []

    if (!params?.filter) {
      const error = new RequiredParamError('filter')
      validationErrors.push({
        code: error.code,
        message: error.message,
      })
    }

    return validationErrors
  }

  private async respondWithCharacters(params: FindCharactersControllerParams) {
    const classes = await this.findCharactersRepo.find(params)

    return {
      data: classes,
      statusCode: HTTPStatusCode.OK,
    }
  }
}
