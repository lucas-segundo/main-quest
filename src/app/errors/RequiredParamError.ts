import { KnownError } from './KnownError'

export class RequiredParamError extends KnownError {
  constructor(param: string) {
    super('REQUIRED_PARAM_ERROR', `${param} is required.`)
  }
}
