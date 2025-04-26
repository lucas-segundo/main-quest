import {
  CreateSkillRepository,
  CreateSkillRepositoryParams,
} from 'domain/entities/Skill/repositories/CreateSkill'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface CreateSkillControllerParams
  extends CreateSkillRepositoryParams {}

export class CreateSkillController implements Controller {
  constructor(
    private readonly createSkillRepo: CreateSkillRepository,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: CreateSkillControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithCreatedSkill(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithCreatedSkill(data: CreateSkillControllerParams) {
    const createdSkill = await this.createSkillRepo.create(data)

    return {
      data: createdSkill,
      statusCode: HTTPStatusCode.CREATED,
    }
  }
}
