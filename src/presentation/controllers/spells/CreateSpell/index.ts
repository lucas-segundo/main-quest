import {
  CreateSpellRepository,
  CreateSpellRepositoryParams,
} from 'entities/Spell/repositories/CreateSpell'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface CreateSpellControllerParams
  extends CreateSpellRepositoryParams {}

export class CreateSpellController implements Controller {
  constructor(
    private readonly createSpellRepo: CreateSpellRepository,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: CreateSpellControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithCreatedSpell(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithCreatedSpell(data: CreateSpellControllerParams) {
    const createdSpell = await this.createSpellRepo.create(data)

    return {
      data: createdSpell,
      statusCode: HTTPStatusCode.CREATED,
    }
  }
}
