import { makeClassFinder } from 'app/useCases/ClassFinder/factory'
import { z } from 'zod'
import { ClassFinderController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'

export const makeClassFinderController = (): ClassFinderController => {
  const classFinder = makeClassFinder()
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new ClassFinderController(classFinder, dataValidator)
}
