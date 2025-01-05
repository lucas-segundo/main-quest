import { z } from 'zod'
import { ClassCreaterController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeCreateClassRepository } from 'app/repositories/classes/CreateClass/factory'

export const makeClassCreaterController = (): ClassCreaterController => {
  const createClassRepo = makeCreateClassRepository()
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new ClassCreaterController(createClassRepo, dataValidator)
}
