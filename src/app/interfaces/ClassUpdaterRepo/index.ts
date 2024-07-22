import { Class } from 'domain/entities/Class'

export interface ClassUpdaterRepoParams {
  name: string
}

export interface ClassUpdaterRepo {
  update(id: string, params: ClassUpdaterRepoParams): Promise<Class>
}
