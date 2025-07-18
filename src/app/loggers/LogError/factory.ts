import { pinoLogger } from 'infra/pino'
import { PinoLogErrorService } from './pino'
import { LogErrorService } from '.'

export const makeLogErrorService = (): LogErrorService => {
  return new PinoLogErrorService(pinoLogger)
}
