import { HealingWordDTO, HealingWordUseCase } from 'app/useCases/HealingWord'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export class HealingWordController implements Controller {
  constructor(
    private readonly healingWordUseCase: HealingWordUseCase,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    params: HealingWordDTO,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate(params)
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      return await this.respond(params)
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }

  private async respond(params: HealingWordDTO) {
    const result = await this.healingWordUseCase.execute(params)

    return {
      data: result,
      statusCode: HTTPStatusCode.OK,
    }
  }
}
