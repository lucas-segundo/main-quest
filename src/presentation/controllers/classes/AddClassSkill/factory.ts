import { z } from 'zod'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { AddClassSkillController } from '.'
import { makeAddClassSkillRepository } from 'entities/Class/repositories/AddClassSkill/factory'

export const makeAddClassSkillController = (): AddClassSkillController => {
  const zodSchema = z.object({
    classID: z.string(),
    skillIDs: z.array(z.string()),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new AddClassSkillController(
    makeAddClassSkillRepository(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
