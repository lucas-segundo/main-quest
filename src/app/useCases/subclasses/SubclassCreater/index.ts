import { ErrorLoggerRepo } from 'app/interfaces/loggers/ErrorLoggerRepo'
import { SubclassCreaterRepo } from 'app/interfaces/subclasses/SubclassCreaterRepo'
import { Subclass } from 'domain/entities/Subclass'

export interface SubclassCreaterParams {
  name: string
  classID: string
}
export class SubclassCreater {
  constructor(
    private subclassCreaterRepo: SubclassCreaterRepo,
    private errorLoggerRepo: ErrorLoggerRepo,
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
