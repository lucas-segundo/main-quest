import { CreateCharacterUseCase } from 'app/useCases/CreateCharacter'
import { CreateCharacterRepositoryParams } from 'entities/Character/repositories/CreateCharacter'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface CreateCharacterControllerParams
  extends CreateCharacterRepositoryParams {}

export class CreateCharacterController implements Controller {
  constructor(
    private readonly createCharacterUseCase: CreateCharacterUseCase,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: CreateCharacterControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithCreatedCharacter(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithCreatedCharacter(
    data: CreateCharacterControllerParams,
  ) {
    const character = await this.createCharacterUseCase.execute(data)

    return {
      data: character,
      statusCode: HTTPStatusCode.CREATED,
    }
  }
}
