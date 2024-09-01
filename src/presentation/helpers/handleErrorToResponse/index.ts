import { KnownError } from 'domain/errors/KnownError'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { HTTPStatusCode } from 'presentation/enums/HTTPStatusCode'
import { HTTPErrorResponse } from 'presentation/interfaces/Controller'

export const handleErrorToResponse = (error: unknown): HTTPErrorResponse => {
  let knownError: KnownError

  if (error instanceof KnownError) {
    knownError = error
  } else {
    knownError = new UnexpectedError()
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
