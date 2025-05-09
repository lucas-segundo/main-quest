import { z } from 'zod'
import { CreateCharacterController } from '.'
import { makeCreateCharacterRepository } from 'entities/Character/repositories/CreateCharacter/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'

export const makeCreateCharacterController = (): CreateCharacterController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new CreateCharacterController(
    makeCreateCharacterRepository(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
