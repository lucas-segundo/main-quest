import { z } from 'zod'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { AddClassSpellController } from '.'
import { makeAddClassSpellService } from 'domain/entities/Class/services/AddClassSpell/factory'

export const makeAddClassSpellController = (): AddClassSpellController => {
  const zodSchema = z.object({
    classID: z.string(),
    spellIDs: z.array(z.string()),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new AddClassSpellController(
    makeAddClassSpellService(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
