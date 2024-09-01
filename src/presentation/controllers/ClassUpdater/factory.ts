import { makeClassUpdater } from 'app/useCases/classes/ClassUpdater/factory'
import { z } from 'zod'
import { ClassUpdaterController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'

export const makeClassUpdaterController = (): ClassUpdaterController => {
  const classUpdater = makeClassUpdater()
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new ClassUpdaterController(classUpdater, dataValidator)
}
