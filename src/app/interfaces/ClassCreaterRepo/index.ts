import { Class } from 'domain/entities/Class'
import { ClassCreaterParams } from 'domain/useCases/ClassCreater'

export interface ClassCreaterRepoParams extends ClassCreaterParams {}

export interface ClassCreaterRepo {
  create(params: ClassCreaterRepoParams): Promise<Class>
}
