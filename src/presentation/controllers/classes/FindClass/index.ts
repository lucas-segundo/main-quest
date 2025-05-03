import {
  FindClassRepository,
  FindClassRepositoryParams,
} from 'entities/Class/repositories/FindClass'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindClassControllerParams extends FindClassRepositoryParams {}

export class FindClassController implements Controller {
  constructor(
    private readonly findClassRepo: FindClassRepository,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: FindClassControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      return await this.respondWithClass(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
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
