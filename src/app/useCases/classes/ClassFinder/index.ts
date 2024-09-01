import { ClassFinderRepo } from 'app/interfaces/classes/ClassFinderRepo'
import { ErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepo'
import { Class } from 'domain/entities/Class'

export interface ClassFinderParams {
  id: {
    equals: string
  }
}
export class ClassFinder {
  constructor(
    private classFinderRepo: ClassFinderRepo,
    private errorLoggerRepo: ErrorLoggerRepo,
  ) {}

  async find(params: ClassFinderParams): Promise<Class> {
    try {
      return await this.classFinderRepo.find({
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
