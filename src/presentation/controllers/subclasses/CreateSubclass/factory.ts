import { z } from 'zod'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { CreateSubclassController } from '.'
import { makeCreateSubclassService } from 'domain/entities/Subclass/services/CreateSubclass/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeCreateSubclassController = (): CreateSubclassController => {
  const zodSchema = z.object({
    name: z.string(),
    classID: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateSubclassController(
    makeCreateSubclassService(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
