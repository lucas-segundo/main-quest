import { UpdateClassService } from 'domain/entities/Class/services/UpdateClass'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface UpdateClassControllerParams {
  name?: string
}

export class UpdateClassController implements Controller {
  constructor(
    private readonly classUpdater: UpdateClassService,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    id: string,
    params: UpdateClassControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithUpdatedClass(id, params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithUpdatedClass(
    id: string,
    params: UpdateClassControllerParams,
  ): Promise<HTTPResponse> {
    const updatedClass = await this.classUpdater.update(id, {
      data: params,
    })

    return {
      data: updatedClass,
      statusCode: HTTPStatusCode.OK,
    }
  }
}
