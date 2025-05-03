import {
  FindSkillsRepository,
  FindSkillsRepositoryParams,
} from 'entities/Skill/repositories/FindSkills'
import { RequiredParamError } from 'app/errors/RequiredParamError'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPError,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindSkillsControllerParams
  extends FindSkillsRepositoryParams {}

export class FindSkillsController implements Controller {
  constructor(
    private readonly findSkillsRepo: FindSkillsRepository,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params?: FindSkillsControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const validationErrors = this.validate(params)
    if (validationErrors.length) {
      return {
        errors: validationErrors,
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithSkills(params as FindSkillsRepositoryParams)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private validate(params?: FindSkillsControllerParams) {
    const validationErrors: HTTPError[] = []

    if (!params?.filter) {
      const error = new RequiredParamError('filter')
      validationErrors.push({
        code: error.code,
        message: error.message,
      })
    }

    return validationErrors
  }

  private async respondWithSkills(params: FindSkillsControllerParams) {
    const classes = await this.findSkillsRepo.find(params)

    return {
      data: classes,
      statusCode: HTTPStatusCode.OK,
    }
  }
}
