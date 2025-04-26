import { makeFindClassesRepository } from 'domain/entities/Class/repositories/FindClasses/factory'
import { FindClassesController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeFindClassesController = (): FindClassesController => {
  return new FindClassesController(
    makeFindClassesRepository(),
    makeHTTPErrorHandler(),
  )
}
