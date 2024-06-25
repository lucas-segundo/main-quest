import { Class } from 'domain/entities/Class'

export interface ClassCreaterRepoParams {
  name: string
}

export interface ClassCreaterRepo {
  create(params: ClassCreaterRepoParams): Promise<Class>
}
