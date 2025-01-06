import { makeSubclassCreater } from 'app/useCases/subclasses/SubclassCreater/factory'
import { z } from 'zod'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { CreateSubclassController } from '.'

export const makeCreateSubclassController = (): CreateSubclassController => {
  const subclassCreater = makeSubclassCreater()
  const zodSchema = z.object({
    name: z.string(),
    classID: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateSubclassController(subclassCreater, dataValidator)
}
