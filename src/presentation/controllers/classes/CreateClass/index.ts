import {
  CreateClassRepository,
  CreateClassRepositoryParams,
} from 'domain/entities/Class/repositories/CreateClass'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface CreateClassControllerParams
  extends CreateClassRepositoryParams {}

export class CreateClassController implements Controller {
  constructor(
    private readonly createClassRepo: CreateClassRepository,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: CreateClassControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithCreatedClass(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithCreatedClass(data: CreateClassControllerParams) {
    const createdClass = await this.createClassRepo.create(data)

    return {
      data: createdClass,
      statusCode: HTTPStatusCode.CREATED,
    }
  }
}
