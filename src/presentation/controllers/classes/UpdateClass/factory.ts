import { z } from 'zod'
import { UpdateClassController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeUpdateClassRepository } from 'domain/entities/Class/repositories/UpdateClass/factory'
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
