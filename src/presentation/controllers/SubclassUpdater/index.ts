import {
  UpdateSubclassRepository,
  UpdateSubclassRepositoryParams,
} from 'domain/entities/Subclass/repositories/UpdateSubclass'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export interface SubclassUpdaterControllerParams {
  id: string
  data: UpdateSubclassRepositoryParams
}

export class SubclassUpdaterController implements Controller {
  constructor(
    private readonly classUpdater: UpdateSubclassRepository,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: SubclassUpdaterControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params.data)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respondWithUpdatedSubclass(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respondWithUpdatedSubclass({
    id,
    data,
  }: SubclassUpdaterControllerParams) {
    const createdSubclass = await this.classUpdater.update(id, data)

    return {
      data: createdSubclass,
      statusCode: HTTPStatusCode.CREATED,
    }
  }
}
