import { z } from 'zod'
import { SubclassUpdaterController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeUpdateClassRepository } from 'domain/entities/Class/repositories/UpdateClass/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeSubclassUpdaterController = (): SubclassUpdaterController => {
  const zodSchema = z.object({
    name: z.string(),
  })

  return new SubclassUpdaterController(
    makeUpdateClassRepository(),
    new ZodDataValidator(zodSchema),
    makeHTTPErrorHandler(),
  )
}
