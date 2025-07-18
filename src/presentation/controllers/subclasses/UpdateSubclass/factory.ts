import { z } from 'zod'
import { UpdateSubclassController } from '.'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeUpdateClassService } from 'domain/entities/Class/services/UpdateClass/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeSubclassUpdaterController = (): UpdateSubclassController => {
  const zodSchema = z.object({
    name: z.string(),
  })

  return new UpdateSubclassController(
    makeUpdateClassService(),
    new ZodDataValidator(zodSchema),
    makeHTTPErrorHandler(),
  )
}
