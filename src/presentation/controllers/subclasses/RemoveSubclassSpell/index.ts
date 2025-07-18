import { RemoveSubclassSpellService } from 'entities/Subclass/services/RemoveSubclassSpell'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export class RemoveSubclassSpellController implements Controller {
  constructor(
    private readonly removeSubclassSpellRepo: RemoveSubclassSpellService,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    classID: string,
    spellIDs: string[],
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate({
      classID,
      spellIDs,
    })
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      const classWithSpell = await this.removeSubclassSpellRepo.remove(
        classID,
        spellIDs,
      )

      return {
        data: classWithSpell,
        statusCode: HTTPStatusCode.OK,
      }
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }
}
