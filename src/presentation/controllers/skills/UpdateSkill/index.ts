import {
  UpdateSkillRepository,
  UpdateSkillRepositoryParams,
} from 'domain/entities/Skill/repositories/UpdateSkill'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface UpdateSkillControllerParams {
  id: string
  data: UpdateSkillRepositoryParams
}

export class UpdateSkillController implements Controller {
  constructor(
    private readonly classUpdater: UpdateSkillRepository,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: UpdateSkillControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params.data)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithUpdatedSkill(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithUpdatedSkill({
    id,
    data,
  }: UpdateSkillControllerParams) {
    const createdSkill = await this.classUpdater.update(id, data)

    return {
      data: createdSkill,
      statusCode: HTTPStatusCode.CREATED,
    }
  }
}
