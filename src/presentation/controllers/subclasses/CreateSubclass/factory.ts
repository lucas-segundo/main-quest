import { z } from 'zod'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { CreateSubclassController } from '.'
import { makeCreateSubclassRepository } from 'entities/Subclass/repositories/CreateSubclass/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeCreateSubclassController = (): CreateSubclassController => {
  const zodSchema = z.object({
    name: z.string(),
    classID: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateSubclassController(
    makeCreateSubclassRepository(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
