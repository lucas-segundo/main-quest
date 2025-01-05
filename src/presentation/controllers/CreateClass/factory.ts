import { z } from 'zod'
import { CreateClassController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeCreateClassRepository } from 'app/repositories/classes/CreateClass/factory'

export const makeCreateClassController = (): CreateClassController => {
  const createClassRepo = makeCreateClassRepository()
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateClassController(createClassRepo, dataValidator)
}
