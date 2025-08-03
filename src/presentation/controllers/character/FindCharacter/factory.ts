import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { FindCharacterController } from '.'
import { makeFindCharacterService } from 'domain/entities/Character/services/FindCharacter/factory'
import { z } from 'zod'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'

export const makeFindCharacterController = (): FindCharacterController => {
  const zodSchema = z.object({
    id: z.string().uuid(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new FindCharacterController(
    makeFindCharacterService(),
    makeHTTPErrorHandler(),
    dataValidator,
  )
}
