import { ClassUpdaterRepo } from 'app/repositories/classes/ClassUpdaterRepo'
import { ErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo'
import { Class } from 'domain/entities/Class'

export interface ClassUpdaterParams {
  name: string
}
export class ClassUpdater {
  constructor(
    private classUpdaterRepo: ClassUpdaterRepo,
    private errorLoggerRepo: ErrorLoggerRepo,
  ) {}

  async update(id: string, params: ClassUpdaterParams): Promise<Class> {
    try {
      return await this.classUpdaterRepo.update(id, {
        data: {
          name: params.name,
        },
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
