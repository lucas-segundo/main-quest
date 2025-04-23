import { FindClassRepository } from 'domain/entities/Class/repositories/FindClass'
import { LogErrorRepository } from 'app/repositories/loggers/LogError/pino/factory'
import { Class } from 'domain/entities/Class'

export interface ClassFinderParams {
  id: {
    equals: string
  }
}
export class ClassFinder {
  constructor(
    private classFinderRepo: FindClassRepository,
    private errorLoggerRepo: LogErrorRepository,
  ) {}

  async find(params: ClassFinderParams): Promise<Class> {
    try {
      return await this.classFinderRepo.find({
        filter: params,
        include: {
          subclasses: true,
        },
      })
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: Error): never {
    this.errorLoggerRepo.log({
      error: error,
    })
    throw error
  }
}
