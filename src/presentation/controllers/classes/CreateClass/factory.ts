import { z } from 'zod'
import { CreateClassController } from '.'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeCreateClassService } from 'entities/Class/services/CreateClass/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeCreateClassController = (): CreateClassController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateClassController(
    makeCreateClassService(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
