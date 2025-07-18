import { mockPinoLogger } from 'infra/pino/mock'
import { PinoLogErrorService } from '.'
import { Logger } from 'pino'
import { LogErrorServiceParams } from '..'
import { mockLogErrorServiceParams } from '../mock'

describe('LogErrorServicesitory', () => {
  it('should call pino with right params', () => {
    const pinoLogger = mockPinoLogger()
    const sut = new PinoLogErrorService(pinoLogger as Logger)

    const params: LogErrorServiceParams = mockLogErrorServiceParams()
    sut.log(params)

    expect(pinoLogger.error).toHaveBeenCalledWith(params.error)
  })
})
