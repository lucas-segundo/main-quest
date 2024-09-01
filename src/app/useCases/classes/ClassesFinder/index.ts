import { ClassesFinderRepo } from 'app/interfaces/classes/ClassesFinderRepo'
import { ErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepo'
import { Class } from 'domain/entities/Class'

export interface ClassesFinderParams {
  name?: {
    like?: string
  }
}
export class ClassesFinder {
  constructor(
    private classesFinderRepo: ClassesFinderRepo,
    private errorLoggerRepo: ErrorLoggerRepo,
  ) {}

  async find(params: ClassesFinderParams): Promise<Class[]> {
    try {
      return await this.classesFinderRepo.find({
        filter: params,
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
