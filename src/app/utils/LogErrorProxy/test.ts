import { mockLogErrorRepository } from 'app/repositories/loggers/LogError/mock'
import { LogErrorProxyHandler } from './index'
import { LogErrorRepository } from 'app/repositories/loggers/LogError'

describe('LogErrorProxyHandler', () => {
  let target: any
  let proxy: any
  let logErrorRepository: LogErrorRepository

  beforeEach(() => {
    logErrorRepository = mockLogErrorRepository()

    target = {
      async methodSuccess() {
        return 'success'
      },
      async methodError() {
        throw new Error('test error')
      },
    }

    proxy = new Proxy(target, new LogErrorProxyHandler(logErrorRepository))
  })

  it('should call the method and return the result', async () => {
    const result = await proxy.methodSuccess()
    expect(result).toBe('success')
  })

  it('should log an error and rethrow it when the method throws an error', async () => {
    await expect(proxy.methodError()).rejects.toThrow('test error')
    expect(logErrorRepository.log).toHaveBeenCalledWith(expect.any(Error))
  })
})
