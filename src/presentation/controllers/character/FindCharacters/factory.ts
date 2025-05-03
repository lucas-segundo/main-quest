import { makeFindCharactersRepository } from 'entities/Character/repositories/FindCharacters/factory'
import { FindCharactersController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeFindCharactersController = (): FindCharactersController => {
  return new FindCharactersController(
    makeFindCharactersRepository(),
    makeHTTPErrorHandler(),
  )
}
