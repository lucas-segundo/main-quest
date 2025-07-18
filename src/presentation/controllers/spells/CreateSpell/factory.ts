import { z } from 'zod'
import { CreateSpellController } from '.'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeCreateSpellService } from 'domain/entities/Spell/services/CreateSpell/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeCreateSpellController = (): CreateSpellController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateSpellController(
    makeCreateSpellService(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
