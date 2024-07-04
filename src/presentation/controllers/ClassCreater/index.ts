import { ClassCreater, ClassCreaterParams } from 'app/useCases/ClassCreater'
import { handleErrorToResponse } from 'presentation/helpers/handleErrorToResponse'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface ClassCreaterControllerParams {
  data: ClassCreaterParams
}

export class ClassCreaterController implements Controller {
  constructor(
    private readonly classCreater: ClassCreater,
    private readonly dataValidator: DataValidator,
  ) {}

  async handle(
    params: ClassCreaterControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const validationResponse = await this.validateDataAndRespondIfHasErrors(
      params.data,
    )
    if (validationResponse) {
      return validationResponse
    }

    try {
      return await this.respondWithCreatedClass(params.data)
    } catch (error) {
      return handleErrorToResponse(error)
    }
  }

  private async validateDataAndRespondIfHasErrors(
    data: ClassCreaterParams,
  ): Promise<HTTPErrorResponse | undefined> {
    const { errors } = await this.dataValidator.validate(data)

    if (errors.length) {
      return {
        statusCode: 400,
        errors,
      }
    }
  }

  private async respondWithCreatedClass(data: ClassCreaterParams) {
    const createdClass = await this.classCreater.create(data)

    return {
      statusCode: 201,
      data: createdClass,
    }
  }
}
