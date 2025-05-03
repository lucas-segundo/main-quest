import { makeFindSubclassRepository } from 'entities/Subclass/repositories/FindSubclass/factory'
import { FindSubclassController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeFindSubclassController = (): FindSubclassController => {
  return new FindSubclassController(
    makeFindSubclassRepository(),
    makeHTTPErrorHandler(),
  )
}
