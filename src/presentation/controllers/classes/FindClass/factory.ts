import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { FindClassController } from '.'
import { makeFindClassRepository } from 'entities/Class/repositories/FindClass/factory'

export const makeFindClassController = (): FindClassController => {
  return new FindClassController(
    makeFindClassRepository(),
    makeHTTPErrorHandler(),
  )
}
