import {
  FindSpellRepository,
  FindSpellRepositoryParams,
} from 'entities/Spell/repositories/FindSpell'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindSpellControllerParams extends FindSpellRepositoryParams {}

export class FindSpellController implements Controller {
  constructor(
    private readonly findSpellRepo: FindSpellRepository,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: FindSpellControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      return await this.respondWithSpell(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithSpell(params: FindSpellControllerParams) {
    const foundSpell = await this.findSpellRepo.find(params)

    return {
      statusCode: 200,
      data: foundSpell,
    }
  }
}
