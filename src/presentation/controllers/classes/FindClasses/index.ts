import {
  FindClassesRepository,
  FindClassesRepositoryParams,
} from 'entities/Class/repositories/FindClasses'
import { RequiredParamError } from 'app/errors/RequiredParamError'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPError,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindClassesControllerParams
  extends FindClassesRepositoryParams {}

export class FindClassesController implements Controller {
  constructor(
    private readonly findClassesRepo: FindClassesRepository,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params?: FindClassesControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const validationErrors = this.validate(params)
    if (validationErrors.length) {
      return {
        errors: validationErrors,
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithClasses(
        params as FindClassesRepositoryParams,
      )
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private validate(params?: FindClassesControllerParams) {
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

  private async respondWithClasses(params: FindClassesControllerParams) {
    const classes = await this.findClassesRepo.find(params)

    return {
      data: classes,
      statusCode: HTTPStatusCode.OK,
    }
  }
}
