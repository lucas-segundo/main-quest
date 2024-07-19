import { ClassesFinderRepo } from 'app/interfaces/ClassesFinderRepo'
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
      return await this.findClasses(params)
    } catch (error) {
      this.handleError(error)
    }
  }

  private async findClasses(params: ClassesFinderParams): Promise<Class[]> {
    const classes = await this.classesFinderRepo.find({
      filter: params,
      include: {
        subclasses: true,
      },
    })

    return classes
  }

  private handleError(error: Error): never {
    this.errorLoggerRepo.log({
      error: error,
    })
    throw error
  }
}
