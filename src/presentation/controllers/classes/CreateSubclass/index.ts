import {
  CreateSubclassRepository,
  CreateSubclassRepositoryParams,
} from 'domain/entities/Subclass/repositories/CreateSubclass'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface CreateSubclassControllerParams
  extends CreateSubclassRepositoryParams {}

export class CreateSubclassController implements Controller {
  constructor(
    private readonly createSubclassRepo: CreateSubclassRepository,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: CreateSubclassControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const validationResponse =
      await this.validateDataAndRespondIfHasErrors(params)
    if (validationResponse) {
      return validationResponse
    }

    try {
      return await this.respondWithCreatedSubclass(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async validateDataAndRespondIfHasErrors(
    params: CreateSubclassControllerParams,
  ): Promise<HTTPErrorResponse | undefined> {
    const { errors } = await this.dataValidator.validate(params)

    if (errors.length) {
      return {
        statusCode: 400,
        errors: adaptValidationErrors(errors),
      }
    }
  }

  private async respondWithCreatedSubclass(
    params: CreateSubclassControllerParams,
  ) {
    const createdSubclass = await this.createSubclassRepo.create(params)

    return {
      statusCode: 201,
      data: createdSubclass,
    }
  }
}
