import { z } from 'zod'
import { UpdateSkillController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeUpdateSkillRepository } from 'domain/entities/Skill/repositories/UpdateSkill/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeSkillUpdaterController = (): UpdateSkillController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new UpdateSkillController(
    makeUpdateSkillRepository(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
