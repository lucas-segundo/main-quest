import { ZodError } from 'zod'

export const adaptZodError = (error: ZodError): string[] => {
  return error.errors.map((error) => {
    const path = error.path.join('.')
    return `${path} (${error.message})`
  })
}
