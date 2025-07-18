import { z } from 'zod'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { RemoveSubclassSpellController } from '.'
import { makeRemoveSubclassSpellService } from 'domain/entities/Subclass/services/RemoveSubclassSpell/factory'

export const makeRemoveSubclassSpellController =
  (): RemoveSubclassSpellController => {
    const zodSchema = z.object({
      classID: z.string(),
      spellIDs: z.array(z.string()),
    })
    const dataValidator = new ZodDataValidator(zodSchema)

    return new RemoveSubclassSpellController(
      makeRemoveSubclassSpellService(),
      dataValidator,
      makeHTTPErrorHandler(),
    )
  }
