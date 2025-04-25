import { mockLogErrorRepository } from 'app/loggers/LogError/mock'
import { HTTPErrorHandler } from '.'

export const mockHTTPErrorHandler = () => {
  const errorRepo = mockLogErrorRepository()
  return new HTTPErrorHandler(errorRepo)
}
