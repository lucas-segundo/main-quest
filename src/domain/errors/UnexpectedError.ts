import { KnownError } from './KnownError'

export class UnexpectedError extends KnownError {
  constructor() {
    super('An unexpected error has occurred. Please try again later.')
    this.name = 'UnexpectedError'
  }
}
