import { z } from 'zod'
import { UpdateClassController } from '.'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeUpdateClassRepository } from 'entities/Class/repositories/UpdateClass/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeClassUpdaterController = (): UpdateClassController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new UpdateClassController(
    makeUpdateClassRepository(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
