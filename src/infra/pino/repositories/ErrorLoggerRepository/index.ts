import {
  ErrorLoggerRepo,
  ErrorLoggerRepoParams,
} from 'app/repositories/loggers/ErrorLoggerRepo'
import { Logger } from 'pino'

export class PinoErrorLoggerRepo implements ErrorLoggerRepo {
  constructor(private readonly pinoLogger: Logger) {}

  log({ error }: ErrorLoggerRepoParams): void {
    this.pinoLogger.error(error)
  }
}
