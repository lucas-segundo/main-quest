import { HTTPErrorHandler } from '.'
import { makeLogErrorRepository } from 'app/repositories/loggers/LogError/factory'

export const makeHTTPErrorHandler = () => {
  const logErrorRepo = makeLogErrorRepository()

  return new HTTPErrorHandler(logErrorRepo)
}
