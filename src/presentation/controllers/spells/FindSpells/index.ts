import {
  FindSpellsRepository,
  FindSpellsRepositoryParams,
} from 'entities/Spell/repositories/FindSpells'
import { RequiredParamError } from 'app/errors/RequiredParamError'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPError,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export interface FindSpellsControllerParams
  extends FindSpellsRepositoryParams {}

export class FindSpellsController implements Controller {
  constructor(
    private readonly findSpellsRepo: FindSpellsRepository,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params?: FindSpellsControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const validationErrors = this.validate(params)
    if (validationErrors.length) {
      return {
        errors: validationErrors,
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithSpells(params as FindSpellsRepositoryParams)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private validate(params?: FindSpellsControllerParams) {
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

  private async respondWithSpells(params: FindSpellsControllerParams) {
    const classes = await this.findSpellsRepo.find(params)

    return {
      data: classes,
      statusCode: HTTPStatusCode.OK,
    }
  }
}
