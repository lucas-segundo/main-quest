import {
  UpdateClassRepository,
  UpdateClassRepositoryParams,
} from 'domain/entities/Class/repositories/UpdateClass'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface ClassUpdaterControllerParams {
  id: string
  data: UpdateClassRepositoryParams
}

export class ClassUpdaterController implements Controller {
  constructor(
    private readonly classUpdater: UpdateClassRepository,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: ClassUpdaterControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params.data)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithUpdatedClass(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithUpdatedClass({
    id,
    data,
  }: ClassUpdaterControllerParams) {
    const createdClass = await this.classUpdater.update(id, data)

    return {
      data: createdClass,
      statusCode: HTTPStatusCode.CREATED,
    }
  }
}
