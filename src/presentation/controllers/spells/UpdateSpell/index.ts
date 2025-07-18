import {
  UpdateSpellService,
  UpdateSpellServiceParams,
} from 'entities/Spell/services/UpdateSpell'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface UpdateSpellControllerParams {
  id: string
  data: UpdateSpellServiceParams
}

export class UpdateSpellController implements Controller {
  constructor(
    private readonly classUpdater: UpdateSpellService,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: UpdateSpellControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params.data)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithUpdatedSpell(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithUpdatedSpell({
    id,
    data,
  }: UpdateSpellControllerParams) {
    const createdSpell = await this.classUpdater.update(id, data)

    return {
      data: createdSpell,
      statusCode: HTTPStatusCode.CREATED,
    }
  }
}
