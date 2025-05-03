import {
  FindSkillRepository,
  FindSkillRepositoryParams,
} from 'entities/Skill/repositories/FindSkill'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindSkillControllerParams extends FindSkillRepositoryParams {}

export class FindSkillController implements Controller {
  constructor(
    private readonly findSkillRepo: FindSkillRepository,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: FindSkillControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      return await this.respondWithSkill(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithSkill(params: FindSkillControllerParams) {
    const foundSkill = await this.findSkillRepo.find(params)

    return {
      statusCode: 200,
      data: foundSkill,
    }
  }
}
