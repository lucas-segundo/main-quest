import { makeClassCreater } from 'app/useCases/ClassCreater/factory'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { z } from 'zod'

export const makeClassCreaterController = (): ClassCreaterController => {
  const classCreater = makeClassCreater()
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new ClassCreaterController(classCreater, dataValidator)
}
