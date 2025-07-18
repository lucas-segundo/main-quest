import { z } from 'zod'
import { UpdateSpellController } from '.'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeUpdateSpellService } from 'entities/Spell/services/UpdateSpell/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeUpdateSpellController = (): UpdateSpellController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new UpdateSpellController(
    makeUpdateSpellService(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
