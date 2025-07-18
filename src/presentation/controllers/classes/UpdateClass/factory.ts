import { z } from 'zod'
import { UpdateClassController } from '.'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeUpdateClassService } from 'domain/entities/Class/services/UpdateClass/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeClassUpdaterController = (): UpdateClassController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new UpdateClassController(
    makeUpdateClassService(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
