import { mockLogErrorRepository } from 'app/loggers/LogError/mock'
import { HTTPErrorHandler } from '.'
import { KnownError } from 'domain/errors/KnownError'
import { UnexpectedError } from 'domain/errors/UnexpectedError'

const makeSUT = () => {
  const logErrorRepo = mockLogErrorRepository()
  const sut = new HTTPErrorHandler(logErrorRepo)

  return {
    sut,
    logErrorRepo,
  }
}

describe('HTTPErrorHandler', () => {
  it('should return a response with statusCode 500 and the error message for KnownError instances', () => {
    const { sut } = makeSUT()
    const knownErrorMessage = 'This is a known error'
    const knownError = new KnownError('CODE', knownErrorMessage)

    const response = sut.handle(knownError)

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

  it('should return a response with statusCode 500, the default error message for non-KnownError instances and log it', () => {
    const { sut, logErrorRepo } = makeSUT()

    const genericError = new Error('Generic error')
    const response = sut.handle(genericError)

    const unexpectedError = new UnexpectedError()
    expect(logErrorRepo.log).toHaveBeenCalledWith({
      error: genericError,
    })
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
