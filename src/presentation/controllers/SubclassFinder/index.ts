import {
  SubclassFinder,
  SubclassFinderParams,
} from 'app/useCases/subclasses/SubclassFinder'
import { handleErrorToResponse } from 'presentation/helpers/handleErrorToResponse'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface SubclassFinderControllerParams {
  query: SubclassFinderParams
}

export class SubclassFinderController implements Controller {
  constructor(private readonly classFinder: SubclassFinder) {}

  async handle(
    params: SubclassFinderControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      return await this.respondWithSubclass(params.query)
    } catch (error) {
      return handleErrorToResponse(error)
    }
  }

  private async respondWithSubclass(params: SubclassFinderParams) {
    const foundSubclass = await this.classFinder.find(params)

    return {
      statusCode: 200,
      data: foundSubclass,
    }
  }
}
