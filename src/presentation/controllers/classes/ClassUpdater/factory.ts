import { z } from 'zod'
import { ClassUpdaterController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeUpdateClassRepository } from 'domain/entities/Class/repositories/UpdateClass/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeClassUpdaterController = (): ClassUpdaterController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new ClassUpdaterController(
    makeUpdateClassRepository(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
