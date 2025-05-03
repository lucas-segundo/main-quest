import { RemoveSubclassSkillRepository } from 'entities/Subclass/repositories/RemoveSubclassSkill'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { adaptValidationErrors } from 'presentation/helpers/adaptValidationErrors'
import { HTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { DataValidator } from 'presentation/interfaces/DataValidator'

export class RemoveSubclassSkillController implements Controller {
  constructor(
    private readonly removeSubclassSkillRepo: RemoveSubclassSkillRepository,
    private readonly dataValidator: DataValidator,
    private readonly httpErrorHandler: HTTPErrorHandler,
  ) {}

  async handle(
    classID: string,
    skillIDs: string[],
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const { errors } = await this.dataValidator.validate({
      classID,
      skillIDs,
    })
    if (errors.length) {
      return {
        errors: adaptValidationErrors(errors),
        statusCode: HTTPStatusCode.BAD_REQUEST,
      }
    }

    try {
      const classWithSkill = await this.removeSubclassSkillRepo.remove(
        classID,
        skillIDs,
      )

      return {
        data: classWithSkill,
        statusCode: HTTPStatusCode.OK,
      }
    } catch (error) {
      return this.httpErrorHandler.handle(error)
    }
  }
}
