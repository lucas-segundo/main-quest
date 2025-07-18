import { Logger } from 'pino'
import { LogErrorService, LogErrorServiceParams } from '..'

export class PinoLogErrorService implements LogErrorService {
  constructor(private readonly pinoLogger: Logger) {}

  log({ error }: LogErrorServiceParams): void {
    this.pinoLogger.error(error)
  }
}
