import { z } from 'zod'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { RemoveSubclassSkillController } from '.'
import { makeRemoveSubclassSkillRepository } from 'domain/entities/Subclass/repositories/RemoveSubclassSkill/factory'

export const makeRemoveSubclassSkillController =
  (): RemoveSubclassSkillController => {
    const zodSchema = z.object({
      classID: z.string(),
      skillIDs: z.array(z.string()),
    })
    const dataValidator = new ZodDataValidator(zodSchema)

    return new RemoveSubclassSkillController(
      makeRemoveSubclassSkillRepository(),
      dataValidator,
      makeHTTPErrorHandler(),
    )
  }
