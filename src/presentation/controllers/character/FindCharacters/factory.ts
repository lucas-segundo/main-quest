import { makeFindCharactersService } from 'domain/entities/Character/services/FindCharacters/factory'
import { FindCharactersController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeFindCharactersController = (): FindCharactersController => {
  return new FindCharactersController(
    makeFindCharactersService(),
    makeHTTPErrorHandler(),
  )
}
