import { z } from 'zod'
import { ClassUpdaterController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeUpdateClassRepository } from 'domain/entities/Class/repositories/UpdateClass/factory'

export const makeClassUpdaterController = (): ClassUpdaterController => {
  const classUpdater = makeUpdateClassRepository()
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new ClassUpdaterController(classUpdater, dataValidator)
}
