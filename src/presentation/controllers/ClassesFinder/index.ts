import {
  ClassesFinder,
  ClassesFinderParams,
} from 'app/useCases/classes/ClassesFinder'
import { RequiredParamError } from 'domain/errors/RequiredParamError'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { handleErrorToResponse } from 'presentation/helpers/handleErrorToResponse'
import {
  Controller,
  HTTPError,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface ClassesFinderControllerParams {
  filter?: ClassesFinderParams
}

export class ClassesFinderController implements Controller {
  constructor(private readonly classesFinder: ClassesFinder) {}

  async handle(
    params?: ClassesFinderControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const validationErrors = this.validate(params)
    if (validationErrors.length) {
      return {
        errors: validationErrors,
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    const validatedParams = params?.filter as ClassesFinderParams
    try {
      return await this.respondWithClasses(validatedParams)
    } catch (error) {
      return handleErrorToResponse(error)
    }
  }

  private validate(params?: ClassesFinderControllerParams) {
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

  private async respondWithClasses(params: ClassesFinderParams) {
    const classes = await this.classesFinder.find(params)

    return {
      data: classes,
      statusCode: HTTPStatusCode.OK,
    }
  }
}
