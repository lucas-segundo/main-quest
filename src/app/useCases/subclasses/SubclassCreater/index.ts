import { LogErrorRepository } from 'app/repositories/loggers/LogError/pino/factory'
import { SubclassCreaterRepo } from 'app/repositories/subclasses/SubclassCreaterRepo'
import { Subclass } from 'domain/entities/Subclass'

export interface SubclassCreaterParams {
  name: string
  classID: string
}
export class SubclassCreater {
  constructor(
    private subclassCreaterRepo: SubclassCreaterRepo,
    private errorLoggerRepo: LogErrorRepository,
  ) {}

  async create(params: SubclassCreaterParams): Promise<Subclass> {
    try {
      return await this.subclassCreaterRepo.create(params)
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
