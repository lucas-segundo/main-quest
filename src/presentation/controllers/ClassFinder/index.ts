import {
  ClassFinder,
  ClassFinderParams,
} from 'app/useCases/classes/ClassFinder'
import { handleErrorToResponse } from 'presentation/helpers/handleErrorToResponse'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface ClassFinderControllerParams {
  query: ClassFinderParams
}

export class ClassFinderController implements Controller {
  constructor(private readonly classFinder: ClassFinder) {}

  async handle(
    params: ClassFinderControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      return await this.respondWithClass(params.query)
    } catch (error) {
      return handleErrorToResponse(error)
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
