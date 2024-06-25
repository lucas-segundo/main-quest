import { ClassCreaterRepo } from 'app/interfaces/ClassCreaterRepo'
import { ErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepository'
import { Class } from 'domain/entities/Class'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { ClassCreater, ClassCreaterParams } from 'domain/useCases/ClassCreater'

export class ClassCreaterImpl implements ClassCreater {
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
