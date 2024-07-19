import { ClassesFinder, ClassesFinderParams } from 'app/useCases/ClassesFinder'
import { handleErrorToResponse } from 'presentation/helpers/handleErrorToResponse'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface ClassesFinderControllerParams {
  query: ClassesFinderParams
}

export class ClassesFinderController implements Controller {
  constructor(private readonly classesFinder: ClassesFinder) {}

  async handle(
    params: ClassesFinderControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      return await this.respondWithClasses(params.query)
    } catch (error) {
      return handleErrorToResponse(error)
    }
  }

  private async respondWithClasses(params: ClassesFinderParams) {
    const classes = await this.classesFinder.find(params)

    return {
      statusCode: 200,
      data: classes,
    }
  }
}
