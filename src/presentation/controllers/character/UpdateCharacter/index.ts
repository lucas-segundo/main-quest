import {
  UpdateCharacterRepository,
  UpdateCharacterRepositoryParams,
} from 'domain/entities/Character/repositories/UpdateCharacter'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface UpdateCharacterControllerParams {
  id: string
  data: UpdateCharacterRepositoryParams
}

export class UpdateCharacterController implements Controller {
  constructor(
    private readonly characterUpdater: UpdateCharacterRepository,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: UpdateCharacterControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params.data)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithUpdatedCharacter(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithUpdatedCharacter({
    id,
    data,
  }: UpdateCharacterControllerParams) {
    const character = await this.characterUpdater.update(id, data)

    return {
      data: character,
      statusCode: HTTPStatusCode.OK,
    }
  }
}
