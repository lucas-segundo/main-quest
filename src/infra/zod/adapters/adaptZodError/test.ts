import { ZodError } from 'zod'
import { adaptZodError } from './index'

describe('adaptZodError', () => {
  it('should correctly adapt a ZodError to an array of strings', () => {
    const zodError = ZodError.create([
      {
        message: 'Invalid name',
        path: ['user', 'name'],
        code: 'invalid_type',
        expected: 'string',
        received: 'number',
      },
      {
        message: 'Invalid age',
        path: ['user', 'age'],
        code: 'invalid_type',
        expected: 'number',
        received: 'string',
      },
    ])

    const expectedErrors: string[] = [
      'user.name (Invalid name)',
      'user.age (Invalid age)',
    ]

    const result = adaptZodError(zodError)

    expect(result).toEqual(expectedErrors)
  })

  it('should handle empty ZodError', () => {
    const zodError: ZodError = new ZodError([])

    const expectedErrors: string[] = []

    const result = adaptZodError(zodError)

    expect(result).toEqual(expectedErrors)
  })
})
