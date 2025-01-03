import { pinoLogger } from 'infra/pino'
import { PinoErrorLoggerRepo } from '.'
import { ErrorLoggerRepo } from '..'

export const makeErrorLoggerRepo = (): ErrorLoggerRepo => {
  return new PinoErrorLoggerRepo(pinoLogger)
}
