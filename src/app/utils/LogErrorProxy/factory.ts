import { makeLogErrorRepository } from 'app/repositories/loggers/LogError/factory'
import { LogErrorProxyHandler } from '.'

export const makeLogErrorProxyHandler = () => {
  return new LogErrorProxyHandler(makeLogErrorRepository())
}
