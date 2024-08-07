import { KnownError } from './KnownError'

export class NotFoundError extends KnownError {
  constructor(entity: string) {
    super('NOT_FOUND', `${entity} not found`)
  }
}
