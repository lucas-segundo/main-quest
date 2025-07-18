import { z } from 'zod'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { AddSubclassSpellController } from '.'
import { makeAddSubclassSpellService } from 'domain/entities/Subclass/services/AddSubclassSpell/factory'

export const makeAddSubclassSpellController =
  (): AddSubclassSpellController => {
    const zodSchema = z.object({
      classID: z.string(),
      spellIDs: z.array(z.string()),
    })
    const dataValidator = new ZodDataValidator(zodSchema)

    return new AddSubclassSpellController(
      makeAddSubclassSpellService(),
      dataValidator,
      makeHTTPErrorHandler(),
    )
  }
