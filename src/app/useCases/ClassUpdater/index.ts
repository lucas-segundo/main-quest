import { ClassUpdaterRepo } from 'app/interfaces/ClassUpdaterRepo'
import { ErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepo'
import { Class } from 'domain/entities/Class'

export interface ClassUpdaterParams {
  name: string
}
export class ClassUpdater {
  constructor(
    private classUpdaterRepo: ClassUpdaterRepo,
    private errorLoggerRepo: ErrorLoggerRepo,
  ) {}

  async update(params: ClassUpdaterParams): Promise<Class> {
    try {
      return await this.updateClass(params)
    } catch (error) {
      this.handleError(error)
    }
  }

  private async updateClass(params: ClassUpdaterParams): Promise<Class> {
    const updatedClass = await this.classUpdaterRepo.update(params)

    return updatedClass
  }

  private handleError(error: Error): never {
    this.errorLoggerRepo.log({
      error: error,
    })
    throw error
  }
}
