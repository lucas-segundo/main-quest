import { UpdateClassRepository } from 'app/repositories/classes/UpdateClass'
import { LogErrorRepository } from 'app/repositories/loggers/LogError/pino/factory'
import { Class } from 'domain/entities/Class'

export interface ClassUpdaterParams {
  name: string
}
export class ClassUpdater {
  constructor(
    private classUpdaterRepo: UpdateClassRepository,
    private errorLoggerRepo: LogErrorRepository,
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
