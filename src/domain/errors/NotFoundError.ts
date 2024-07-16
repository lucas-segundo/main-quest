import { KnownError } from './KnownError'

export class NotFoundError extends KnownError {
  constructor(entity: string) {
    super(`${entity} not found`)
    this.name = 'NotFoundError'
  }
}
