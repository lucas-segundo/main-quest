import { z } from 'zod'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { RemoveClassSkillController } from '.'
import { makeRemoveClassSkillRepository } from 'domain/entities/Class/repositories/RemoveClassSkill/factory'

export const makeRemoveClassSkillController =
  (): RemoveClassSkillController => {
    const zodSchema = z.object({
      classID: z.string(),
      skillIDs: z.array(z.string()),
    })
    const dataValidator = new ZodDataValidator(zodSchema)

    return new RemoveClassSkillController(
      makeRemoveClassSkillRepository(),
      dataValidator,
      makeHTTPErrorHandler(),
    )
  }
