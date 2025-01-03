import { ErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo'
import { SubclassUpdaterRepo } from 'app/repositories/subclasses/SubclassUpdaterRepo'
import { Subclass } from 'domain/entities/Subclass'

export interface SubclassUpdaterParams {
  name: string
}
export class SubclassUpdater {
  constructor(
    private classUpdaterRepo: SubclassUpdaterRepo,
    private errorLoggerRepo: ErrorLoggerRepo,
  ) {}

  async update(id: string, params: SubclassUpdaterParams): Promise<Subclass> {
    try {
      return await this.classUpdaterRepo.update(id, {
        data: {
          name: params.name,
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
