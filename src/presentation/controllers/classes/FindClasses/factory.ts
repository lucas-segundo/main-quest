import { makeFindClassesService } from 'domain/entities/Class/services/FindClasses/factory'
import { FindClassesController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeFindClassesController = (): FindClassesController => {
  return new FindClassesController(
    makeFindClassesService(),
    makeHTTPErrorHandler(),
  )
}
