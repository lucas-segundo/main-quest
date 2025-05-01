import { z } from 'zod'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { AddSubclassSkillController } from '.'
import { makeAddSubclassSkillRepository } from 'domain/entities/Subclass/repositories/AddSubclassSkill/factory'

export const makeAddSubclassSkillController =
  (): AddSubclassSkillController => {
    const zodSchema = z.object({
      classID: z.string(),
      skillIDs: z.array(z.string()),
    })
    const dataValidator = new ZodDataValidator(zodSchema)

    return new AddSubclassSkillController(
      makeAddSubclassSkillRepository(),
      dataValidator,
      makeHTTPErrorHandler(),
    )
  }
