import { z } from 'zod'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { RemoveClassSpellController } from '.'
import { makeRemoveClassSpellRepository } from 'entities/Class/repositories/RemoveClassSpell/factory'

export const makeRemoveClassSpellController =
  (): RemoveClassSpellController => {
    const zodSchema = z.object({
      classID: z.string(),
      spellIDs: z.array(z.string()),
    })
    const dataValidator = new ZodDataValidator(zodSchema)

    return new RemoveClassSpellController(
      makeRemoveClassSpellRepository(),
      dataValidator,
      makeHTTPErrorHandler(),
    )
  }
