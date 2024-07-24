import { Class } from 'domain/entities/Class'

interface Data {
  name?: string
}

interface Include {
  subclasses?: boolean
}

export interface ClassUpdaterRepoParams {
  data: Data
  include?: Include
}

export interface ClassUpdaterRepo {
  update(id: string, params: ClassUpdaterRepoParams): Promise<Class>
}
