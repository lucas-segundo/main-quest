import { z } from 'zod'
import { CreateCharacterController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeCreateCharacterUserCase } from 'app/useCases/CreateCharacter/factory'

export const makeCreateCharacterController = (): CreateCharacterController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateCharacterController(
    makeCreateCharacterUserCase(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
