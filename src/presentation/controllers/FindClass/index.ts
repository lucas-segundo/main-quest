import {
  FindClassRepository,
  FindClassRepositoryParams,
} from 'app/repositories/classes/FindClass'
import { handleErrorToResponse } from 'presentation/helpers/handleErrorToResponse'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindClassControllerParams extends FindClassRepositoryParams {}

export class FindClassController implements Controller {
  constructor(private readonly findClassRepo: FindClassRepository) {}

  async handle(
    params: FindClassControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      return await this.respondWithClass(params)
    } catch (error) {
      return handleErrorToResponse(error)
    }
  }

  private async respondWithClass(params: FindClassControllerParams) {
    const foundClass = await this.findClassRepo.find(params)

    return {
      statusCode: 200,
      data: foundClass,
    }
  }
}
