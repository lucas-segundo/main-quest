import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { FindClassController } from '.'
import { makeFindClassService } from 'domain/entities/Class/services/FindClass/factory'

export const makeFindClassController = (): FindClassController => {
  return new FindClassController(makeFindClassService(), makeHTTPErrorHandler())
}
