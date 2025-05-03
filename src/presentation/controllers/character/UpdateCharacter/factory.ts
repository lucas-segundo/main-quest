import { z } from 'zod'
import { UpdateCharacterController } from '.'
import { ZodDataValidator } from 'infra/zod/DataValidator'
import { makeUpdateCharacterRepository } from 'entities/Character/repositories/UpdateCharacter/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeUpdateCharacterController = (): UpdateCharacterController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new UpdateCharacterController(
    makeUpdateCharacterRepository(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
