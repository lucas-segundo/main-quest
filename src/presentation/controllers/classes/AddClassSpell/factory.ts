import { z } from 'zod'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { AddClassSpellController } from '.'
import { makeAddClassSpellRepository } from 'entities/Class/repositories/AddClassSpell/factory'

export const makeAddClassSpellController = (): AddClassSpellController => {
  const zodSchema = z.object({
    classID: z.string(),
    spellIDs: z.array(z.string()),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new AddClassSpellController(
    makeAddClassSpellRepository(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
