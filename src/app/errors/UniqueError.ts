import { KnownError } from './KnownError'

export class UniqueError extends KnownError {
  constructor(entity: string) {
    super('UNIQUE_ERROR', `${entity} already exists`)
  }
}
