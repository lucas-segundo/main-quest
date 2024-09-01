import { handleErrorToResponse } from './index'
import { KnownError } from 'domain/errors/KnownError'
import { UnexpectedError } from 'domain/errors/UnexpectedError'

describe('handleErrorToResponse', () => {
  it('should return a response with statusCode 500 and the error message for KnownError instances', () => {
    const knownErrorMessage = 'This is a known error'
    const knownError = new KnownError('CODE', knownErrorMessage)

    const response = handleErrorToResponse(knownError)

    expect(response).toEqual({
      statusCode: 500,
      errors: [
        {
          code: knownError.code,
          message: knownError.message,
        },
      ],
    })
  })

  it('should return a response with statusCode 500 and the default error message for non-KnownError instances', () => {
    const genericError = new Error('Generic error')

    const response = handleErrorToResponse(genericError)

    const unexpectedError = new UnexpectedError()
    expect(response).toEqual({
      statusCode: 500,
      errors: [
        {
          code: unexpectedError.code,
          message: unexpectedError.message,
        },
      ],
    })
  })
})
