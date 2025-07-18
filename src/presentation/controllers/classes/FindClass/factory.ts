import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { FindClassController } from '.'
import { makeFindClassService } from 'entities/Class/services/FindClass/factory'

export const makeFindClassController = (): FindClassController => {
  return new FindClassController(makeFindClassService(), makeHTTPErrorHandler())
}
