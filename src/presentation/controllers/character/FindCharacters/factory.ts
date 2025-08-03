import { makeFindCharactersService } from 'domain/entities/Character/services/FindCharacters/factory'
import { FindCharactersController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { z } from 'zod'

export const makeFindCharactersController = (): FindCharactersController => {
  const zodSchema = z.object({
    name: z
      .object({
        lk: z.string().optional(),
      })
      .optional(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new FindCharactersController(
    makeFindCharactersService(),
    makeHTTPErrorHandler(),
    dataValidator,
  )
}
