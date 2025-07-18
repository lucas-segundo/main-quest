import { z } from 'zod'
import { UpdateCharacterController } from '.'
import { ZodDataValidator } from 'presentation/interfaces/DataValidator/zod'
import { makeUpdateCharacterService } from 'entities/Character/services/UpdateCharacter/factory'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeUpdateCharacterController = (): UpdateCharacterController => {
  const zodSchema = z.object({
    name: z.string(),
  })
  const dataValidator = new ZodDataValidator(zodSchema)

  return new UpdateCharacterController(
    makeUpdateCharacterService(),
    dataValidator,
    makeHTTPErrorHandler(),
  )
}
