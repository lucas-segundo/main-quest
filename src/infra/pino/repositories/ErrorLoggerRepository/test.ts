import { mockPinoLogger } from 'infra/pino/mock'
import { PinoErrorLoggerRepo } from '.'
import { Logger } from 'pino'
import { ErrorLoggerRepoParams } from 'app/interfaces/ErrorLoggerRepo'
import { mockErrorLoggerRepoParams } from 'app/interfaces/ErrorLoggerRepo/mock'

describe('ErrorLoggerRepository', () => {
  it('should call pino with right params', () => {
    const pinoLogger = mockPinoLogger()
    const sut = new PinoErrorLoggerRepo(pinoLogger as Logger)

    const params: ErrorLoggerRepoParams = mockErrorLoggerRepoParams()
    sut.log(params)

    expect(pinoLogger.error).toHaveBeenCalledWith(params.error)
  })
})
