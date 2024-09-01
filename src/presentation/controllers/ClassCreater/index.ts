import { ClassCreater, ClassCreaterParams } from 'app/useCases/ClassCreater'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
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
    const { errors } = await this.dataValidator.validate(params.data)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithCreatedClass(params.data)
    } catch (error) {
      return handleErrorToResponse(error)
    }
  }

  private async respondWithCreatedClass(data: ClassCreaterParams) {
    const createdClass = await this.classCreater.create(data)

    return {
      data: createdClass,
      statusCode: HTTPStatusCode.CREATED,
    }
  }
}
