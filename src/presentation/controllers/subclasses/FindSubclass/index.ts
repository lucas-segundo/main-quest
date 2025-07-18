import { FindClassServiceParams } from 'entities/Class/services/FindClass'
import { FindSubclassService } from 'entities/Subclass/services/FindSubclass'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindSubclassControllerParams extends FindClassServiceParams {}

export class FindSubclassController implements Controller {
  constructor(
    private readonly findSubclassRepo: FindSubclassService,
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
