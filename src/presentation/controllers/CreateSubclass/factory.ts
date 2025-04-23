import { z } from 'zod'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { CreateSubclassController } from '.'
import { makeCreateSubclassRepository } from 'domain/entities/Subclass/repositories/CreateSubclass/factory'

export const makeCreateSubclassController = (): CreateSubclassController => {
  const subclassCreater = makeCreateSubclassRepository()
  const zodSchema = z.object({
    name: z.string(),
    classID: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateSubclassController(subclassCreater, dataValidator)
}
