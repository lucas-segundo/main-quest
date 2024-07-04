import { KnownError } from 'domain/errors/KnownError'
import { UnexpectedError } from 'domain/errors/UnexpectedError'

export const handleErrorToResponse = (error: unknown) => {
  if (error instanceof KnownError) {
    return {
      statusCode: 500,
      errors: [error.message],
    }
  }

  return {
    statusCode: 500,
    errors: [new UnexpectedError().message],
  }
}
