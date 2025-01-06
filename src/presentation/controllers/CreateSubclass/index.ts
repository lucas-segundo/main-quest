import {
  CreateSubclassRepository,
  CreateSubclassRepositoryParams,
} from 'app/repositories/subclasses/CreateSubclass'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { handleErrorToResponse } from 'presentation/helpers/handleErrorToResponse'
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
      return handleErrorToResponse(error)
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
