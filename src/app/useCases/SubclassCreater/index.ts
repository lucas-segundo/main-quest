import { ErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepo'
import { SubclassCreaterRepo } from 'app/interfaces/SubclassCreaterRepo'
import { Subclass } from 'domain/entities/Subclass'

export interface SubclassCreaterParams {
  name: string
  classID: string
}
export class SubclassCreater {
  constructor(
    private subclassCreaterRepo: SubclassCreaterRepo,
    private errorLoggerRepo: ErrorLoggerRepo,
  ) {}

  async create(params: SubclassCreaterParams): Promise<Subclass> {
    try {
      return await this.createClass(params)
    } catch (error) {
      this.handleError(error)
    }
  }

  private async createClass(params: SubclassCreaterParams): Promise<Subclass> {
    const createdClass = await this.subclassCreaterRepo.create(params)

    return createdClass
  }

  private handleError(error: Error): never {
    this.errorLoggerRepo.log({
      error: error,
    })
    throw error
  }
}
