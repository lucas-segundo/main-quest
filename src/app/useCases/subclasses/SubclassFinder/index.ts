import { LogErrorRepository } from 'app/repositories/loggers/LogError/pino/factory'
import { FindSubclasses } from 'app/repositories/subclasses/FindSubclasses'
import { Subclass } from 'domain/entities/Subclass'

export interface SubclassFinderParams {
  id: {
    equals: string
  }
}
export class SubclassFinder {
  constructor(
    private subclassFinderRepo: FindSubclasses,
    private errorLoggerRepo: LogErrorRepository,
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
