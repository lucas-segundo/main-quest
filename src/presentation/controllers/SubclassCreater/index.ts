import {
  SubclassCreater,
  SubclassCreaterParams,
} from 'app/useCases/subclasses/SubclassCreater'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { handleErrorToResponse } from 'presentation/helpers/handleErrorToResponse'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface SubclassCreaterControllerParams {
  data: SubclassCreaterParams
}

export class SubclassCreaterController implements Controller {
  constructor(
    private readonly subclassCreater: SubclassCreater,
    private readonly dataValidator: DataValidator,
  ) {}

  async handle(
    params: SubclassCreaterControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const validationResponse = await this.validateDataAndRespondIfHasErrors(
      params.data,
    )
    if (validationResponse) {
      return validationResponse
    }

    try {
      return await this.respondWithCreatedSubclass(params.data)
    } catch (error) {
      return handleErrorToResponse(error)
    }
  }

  private async validateDataAndRespondIfHasErrors(
    data: SubclassCreaterParams,
  ): Promise<HTTPErrorResponse | undefined> {
    const { errors } = await this.dataValidator.validate(data)

    if (errors.length) {
      return {
        statusCode: 400,
        errors: adaptValidationErrors(errors),
      }
    }
  }

  private async respondWithCreatedSubclass(data: SubclassCreaterParams) {
    const createdSubclass = await this.subclassCreater.create(data)

    return {
      statusCode: 201,
      data: createdSubclass,
    }
  }
}
