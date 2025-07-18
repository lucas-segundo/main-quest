import { z } from 'zod'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { RemoveClassSpellController } from '.'
import { makeRemoveClassSpellService } from 'domain/entities/Class/services/RemoveClassSpell/factory'

export const makeRemoveClassSpellController =
  (): RemoveClassSpellController => {
    const zodSchema = z.object({
      classID: z.string(),
      spellIDs: z.array(z.string()),
    })
    const dataValidator = new ZodDataValidator(zodSchema)

    return new RemoveClassSpellController(
      makeRemoveClassSpellService(),
      dataValidator,
      makeHTTPErrorHandler(),
    )
  }
