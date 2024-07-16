import { ClassFinder, ClassFinderParams } from 'app/useCases/ClassFinder'
import { handleErrorToResponse } from 'presentation/helpers/handleErrorToResponse'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface ClassFinderControllerParams {
  query: ClassFinderParams
}

export class ClassFinderController implements Controller {
  constructor(
    private readonly classFinder: ClassFinder,
    private readonly dataValidator: DataValidator,
  ) {}

  async handle(
    params: ClassFinderControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const validationResponse = await this.validateDataAndRespondIfHasErrors(
      params.query,
    )
    if (validationResponse) {
      return validationResponse
    }

    try {
      return await this.respondWithClass(params.query)
    } catch (error) {
      return handleErrorToResponse(error)
    }
  }

  private async validateDataAndRespondIfHasErrors(
    data: ClassFinderParams,
  ): Promise<HTTPErrorResponse | undefined> {
    const { errors } = await this.dataValidator.validate(data)

    if (errors.length) {
      return {
        statusCode: 400,
        errors,
      }
    }
  }

  private async respondWithClass(params: ClassFinderParams) {
    const foundClass = await this.classFinder.find(params)

    return {
      statusCode: 200,
      data: foundClass,
    }
  }
}
