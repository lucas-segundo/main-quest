import { z } from 'zod'
import { CreateSkillController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeCreateSkillRepository } from 'entities/Skill/repositories/CreateSkill/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeCreateSkillController = (): CreateSkillController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateSkillController(
    makeCreateSkillRepository(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
