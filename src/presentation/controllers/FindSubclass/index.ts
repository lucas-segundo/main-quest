import { FindClassRepositoryParams } from 'domain/entities/Class/repositories/FindClass'
import { FindSubclassRepository } from 'domain/entities/Subclass/repositories/FindSubclass'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindSubclassControllerParams
  extends FindClassRepositoryParams {}

export class FindSubclassController implements Controller {
  constructor(
    private readonly findSubclassRepo: FindSubclassRepository,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: FindSubclassControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      return await this.respondWithSubclass(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithSubclass(params: FindSubclassControllerParams) {
    const foundSubclass = await this.findSubclassRepo.find(params)

    return {
      statusCode: 200,
      data: foundSubclass,
    }
  }
}
