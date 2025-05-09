import { z } from 'zod'
import { CreateClassController } from '.'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeCreateClassRepository } from 'entities/Class/repositories/CreateClass/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeCreateClassController = (): CreateClassController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateClassController(
    makeCreateClassRepository(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
