import { pinoLogger } from 'infra/pino'
import { PinoLogErrorRepository } from '.'
import { LogErrorRepository } from '..'

export const makeLogErrorRepository = (): LogErrorRepository => {
  return new PinoLogErrorRepository(pinoLogger)
}
