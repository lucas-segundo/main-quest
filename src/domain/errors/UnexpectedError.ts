import { KnownError } from './KnownError'

export class UnexpectedError extends KnownError {
  constructor() {
    super(
      'UNEXPECTED_ERROR',
      'An unexpected error has occurred. Please try again later.',
    )
  }
}
