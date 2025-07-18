import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { FindCharacterController } from '.'
import { makeFindCharacterService } from 'entities/Character/services/FindCharacter/factory'

export const makeFindCharacterController = (): FindCharacterController => {
  return new FindCharacterController(
    makeFindCharacterService(),
    makeHTTPErrorHandler(),
  )
}
