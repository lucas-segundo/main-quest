import { z } from 'zod'
import { SubclassUpdaterController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeUpdateClassRepository } from 'domain/entities/Class/repositories/UpdateClass/factory'

export const makeSubclassUpdaterController = (): SubclassUpdaterController => {
  const classUpdater = makeUpdateClassRepository()
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new SubclassUpdaterController(classUpdater, dataValidator)
}
