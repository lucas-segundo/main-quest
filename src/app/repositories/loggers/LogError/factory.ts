import { pinoLogger } from 'infra/pino'
import { PinoLogErrorRepository } from './pino'
import { LogErrorRepository } from '.'

export const makeLogErrorRepository = (): LogErrorRepository => {
  return new PinoLogErrorRepository(pinoLogger)
}
