import { ClassCreaterRepo } from 'app/repositories/classes/ClassCreaterRepo'
import { ErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo'
import { Class } from 'domain/entities/Class'

export interface ClassCreaterParams {
  name: string
}
export class ClassCreater {
  constructor(
    private classCreaterRepo: ClassCreaterRepo,
    private errorLoggerRepo: ErrorLoggerRepo,
  ) {}

  async create(params: ClassCreaterParams): Promise<Class> {
    try {
      return await this.classCreaterRepo.create(params)
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
