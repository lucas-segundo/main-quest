import { ClassFinderRepo } from 'app/interfaces/ClassFinderRepo'
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
      return await this.findClass(params)
    } catch (error) {
      this.handleError(error)
    }
  }

  private async findClass(params: ClassFinderParams): Promise<Class> {
    const foundClass = await this.classFinderRepo.find(params)

    return foundClass
  }

  private handleError(error: Error): never {
    this.errorLoggerRepo.log({
      error: error,
    })
    throw error
  }
}
