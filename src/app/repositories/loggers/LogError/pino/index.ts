import { Logger } from 'pino'
import { LogErrorRepository, LogErrorRepositoryParams } from '..'

export class PinoLogErrorRepository implements LogErrorRepository {
  constructor(private readonly pinoLogger: Logger) {}

  log({ error }: LogErrorRepositoryParams): void {
    this.pinoLogger.error(error)
  }
}
