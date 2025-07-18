import { makeFindSubclassService } from 'domain/entities/Subclass/services/FindSubclass/factory'
import { FindSubclassController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeFindSubclassController = (): FindSubclassController => {
  return new FindSubclassController(
    makeFindSubclassService(),
    makeHTTPErrorHandler(),
  )
}
