import { mockLogErrorService } from 'app/loggers/LogError/mock'
import { HTTPErrorHandler } from '.'

export const mockHTTPErrorHandler = () => {
  const errorRepo = mockLogErrorService()
  return new HTTPErrorHandler(errorRepo)
}
