import { FindClassesRepository } from 'domain/entities/Class/repositories/FindClasses'
import { LogErrorRepository } from 'app/repositories/loggers/LogError/pino/factory'
import { Class } from 'domain/entities/Class'

export interface ClassesFinderParams {
  name?: {
    like?: string
  }
}
export class ClassesFinder {
  constructor(
    private findClassesRepoRepo: FindClassesRepository,
    private errorLoggerRepo: LogErrorRepository,
  ) {}

  async find(params: ClassesFinderParams): Promise<Class[]> {
    try {
      return await this.findClassesRepoRepo.find({
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
