import { LogErrorRepository } from 'app/repositories/loggers/LogError/pino/factory'
import { UpdateSubclassRepository } from 'app/repositories/subclasses/UpdateSubclassRepository'
import { Subclass } from 'domain/entities/Subclass'

export interface SubclassUpdaterParams {
  name: string
}
export class SubclassUpdater {
  constructor(
    private classUpdaterRepo: UpdateSubclassRepository,
    private errorLoggerRepo: LogErrorRepository,
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
