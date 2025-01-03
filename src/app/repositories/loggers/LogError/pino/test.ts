import { mockPinoLogger } from 'infra/pino/mock'
import { PinoLogErrorRepository } from '.'
import { Logger } from 'pino'
import { LogErrorRepositoryParams } from '..'
import { mockLogErrorRepositoryParams } from '../mock'

describe('LogErrorRepositorysitory', () => {
  it('should call pino with right params', () => {
    const pinoLogger = mockPinoLogger()
    const sut = new PinoLogErrorRepository(pinoLogger as Logger)

    const params: LogErrorRepositoryParams = mockLogErrorRepositoryParams()
    sut.log(params)

    expect(pinoLogger.error).toHaveBeenCalledWith(params.error)
  })
})
