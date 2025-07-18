import { HTTPErrorHandler } from '.'
import { makeLogErrorService } from 'app/loggers/LogError/factory'

export const makeHTTPErrorHandler = () => {
  const logErrorRepo = makeLogErrorService()

  return new HTTPErrorHandler(logErrorRepo)
}
