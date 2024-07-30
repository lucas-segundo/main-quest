import { ClassesFinder, ClassesFinderParams } from 'app/useCases/ClassesFinder'
import { handleErrorToResponse } from 'presentation/helpers/handleErrorToResponse'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface ClassesFinderControllerParams {
  filter?: {
    class?: ClassesFinderParams
  }
}

export class ClassesFinderController implements Controller {
  constructor(private readonly classesFinder: ClassesFinder) {}

  async handle(
    params?: ClassesFinderControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const classFilter = params?.filter?.class
    if (!classFilter) {
      return {
        errors: ['Missing class filters from params'],
        statusCode: 400,
      }
    }

    try {
      return await this.respondWithClasses(classFilter)
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
