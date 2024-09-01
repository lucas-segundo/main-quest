import { makeSubclassUpdater } from 'app/useCases/SubclassUpdater/factory'
import { z } from 'zod'
import { SubclassUpdaterController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'

export const makeSubclassUpdaterController = (): SubclassUpdaterController => {
  const classUpdater = makeSubclassUpdater()
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new SubclassUpdaterController(classUpdater, dataValidator)
}
