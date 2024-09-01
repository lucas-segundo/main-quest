import { HTTPError } from 'presentation/interfaces/Controller'

export const adaptValidationErrors = (errors: string[]): HTTPError[] =>
  errors.map(
    (error): HTTPError => ({ code: 'VALIDATION_ERROR', message: error }),
  )
