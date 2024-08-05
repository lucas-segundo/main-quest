import { KnownError } from './KnownError'

export class RequiredParamError extends KnownError {
  constructor(param: string) {
    super(`${param} is required`)
    this.name = 'RequiredParamError'
  }
}
