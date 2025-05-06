import { z } from 'zod'
import { CreateSpellController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeCreateSpellRepository } from 'entities/Spell/repositories/CreateSpell/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeCreateSpellController = (): CreateSpellController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateSpellController(
    makeCreateSpellRepository(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
