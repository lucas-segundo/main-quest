import { Class } from 'domain/entities/Class'

export interface ClassUpdaterRepoParams {
  name: string
}

export interface ClassUpdaterRepo {
  update(params: ClassUpdaterRepoParams): Promise<Class>
}
