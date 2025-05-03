import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { FindCharacterController } from '.'
import { makeFindCharacterRepository } from 'domain/entities/Character/repositories/FindCharacter/factory'

export const makeFindCharacterController = (): FindCharacterController => {
  return new FindCharacterController(
    makeFindCharacterRepository(),
    makeHTTPErrorHandler(),
  )
}
