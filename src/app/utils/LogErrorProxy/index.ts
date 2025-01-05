import { LogErrorRepository } from 'app/repositories/loggers/LogError'

export class LogErrorProxyHandler implements ProxyHandler<any> {
  constructor(private readonly logErrorRepository: LogErrorRepository) {}

  get(target: Record<string, any>, prop: string) {
    const targetProp = target[prop]
    const isMethod = typeof targetProp === 'function'
    if (isMethod) {
      return this.addLogError(targetProp)
    } else {
      return targetProp
    }
  }

  private addLogError(targetProp: (params: any) => Promise<any>) {
    const logErrorRepository = this.logErrorRepository
    return async function (...args: any[]) {
      try {
        return await targetProp(args)
      } catch (error) {
        logErrorRepository.log(error)
        throw error
      }
    }
  }
}
