import { handleErrorToResponse } from './index'
import { KnownError } from 'domain/errors/KnownError'
import { UnexpectedError } from 'domain/errors/UnexpectedError'

describe('handleErrorToResponse', () => {
  it('should return a response with statusCode 500 and the error message for KnownError instances', () => {
    const knownErrorMessage = 'This is a known error'
    const knownError = new KnownError(knownErrorMessage)

    const response = handleErrorToResponse(knownError)

    expect(response).toEqual({
      statusCode: 500,
      errors: [knownErrorMessage],
    })
  })

  it('should return a response with statusCode 500 and the default error message for non-KnownError instances', () => {
    const genericError = new Error('Generic error')

    const response = handleErrorToResponse(genericError)

    expect(response).toEqual({
      statusCode: 500,
      errors: [new UnexpectedError().message],
    })
  })
})
