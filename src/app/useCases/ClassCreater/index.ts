import { ClassCreaterRepo } from 'app/interfaces/ClassCreaterRepo'
import { ErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepo'
import { Class } from 'domain/entities/Class'
import { UnexpectedError } from 'domain/errors/UnexpectedError'

export interface ClassCreaterParams {
  name: string
}
export class ClassCreater {
  constructor(
    private classCreaterRepo: ClassCreaterRepo,
    private errorLoggerRepo: ErrorLoggerRepo,
  ) {}

  async create(params: ClassCreaterParams): Promise<Class> {
    try {
      return await this.createClass(params)
    } catch (error) {
      this.handleError(error)
    }
  }

  private async createClass(params: ClassCreaterParams): Promise<Class> {
    const createdClass = await this.classCreaterRepo.create(params)

    return createdClass
  }

  private handleError(error: Error): never {
    this.errorLoggerRepo.log({
      error: error,
    })
    throw new UnexpectedError()
  }
}
