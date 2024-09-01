import { makeClassCreater } from 'app/useCases/classes/ClassCreater/factory'
import { z } from 'zod'
import { ClassCreaterController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'

export const makeClassCreaterController = (): ClassCreaterController => {
  const classCreater = makeClassCreater()
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new ClassCreaterController(classCreater, dataValidator)
}
