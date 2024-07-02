import { makeSubclassCreater } from 'app/useCases/SubclassCreater/factory'
import { z } from 'zod'
import { SubclassCreaterController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'

export const makeSubclassCreaterController = (): SubclassCreaterController => {
  const subclassCreater = makeSubclassCreater()
  const zodSchema = z.object({
    name: z.string(),
    classID: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new SubclassCreaterController(subclassCreater, dataValidator)
}
