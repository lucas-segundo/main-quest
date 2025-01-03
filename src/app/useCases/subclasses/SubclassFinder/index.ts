import { ErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo'
import { SubclassFinderRepo } from 'app/repositories/subclasses/SubclassFinderRepo'
import { Subclass } from 'domain/entities/Subclass'

export interface SubclassFinderParams {
  id: {
    equals: string
  }
}
export class SubclassFinder {
  constructor(
    private subclassFinderRepo: SubclassFinderRepo,
    private errorLoggerRepo: ErrorLoggerRepo,
  ) {}

  async find(params: SubclassFinderParams): Promise<Subclass> {
    try {
      return await this.subclassFinderRepo.find({
        filter: params,
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
