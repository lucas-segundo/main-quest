import { CreateClassRepository } from 'app/repositories/classes/CreateClass'
import { LogErrorRepository } from 'app/repositories/loggers/LogError'
import { Class } from 'domain/entities/Class'

export interface ClassCreaterParams {
  name: string
}
export class ClassCreater {
  constructor(
    private classCreaterRepo: CreateClassRepository,
    private errorLoggerRepo: LogErrorRepository,
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
