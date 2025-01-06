import { FindClassRepositoryParams } from 'app/repositories/classes/FindClass'
import { FindSubclassRepository } from 'app/repositories/subclasses/FindSubclass'
import { handleErrorToResponse } from 'presentation/helpers/handleErrorToResponse'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindSubclassControllerParams
  extends FindClassRepositoryParams {}

export class FindSubclassController implements Controller {
  constructor(private readonly findSubclassRepo: FindSubclassRepository) {}

  async handle(
    params: FindSubclassControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      return await this.respondWithSubclass(params)
    } catch (error) {
      return handleErrorToResponse(error)
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
