import { LogErrorRepository } from 'app/loggers/LogError'
import { KnownError } from 'app/errors/KnownError'
import { UnexpectedError } from 'app/errors/UnexpectedError'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { HTTPErrorResponse } from 'presentation/interfaces/Controller'

export class HTTPErrorHandler {
  constructor(private logErrorRepo: LogErrorRepository) {}

  handle(error: unknown): HTTPErrorResponse {
    let knownError: KnownError

    if (error instanceof KnownError) {
      knownError = error
    } else {
      knownError = new UnexpectedError()
      this.logError(error)
    }

    const { code, message } = knownError
    return {
      statusCode: HTTPStatusCode.SERVER_ERROR,
      errors: [
        {
          code,
          message,
        },
      ],
    }
  }

  private async logError(error: unknown) {
    if (error instanceof Error) {
      this.logErrorRepo.log({ error })
    } else {
      this.logErrorRepo.log({
        error: new Error(String(error)),
      })
    }
  }
}
