import { Class } from 'domain/entities/Class'

interface Data {
  name?: string
}

interface Include {
  subclasses?: boolean
}

export interface UpdateClassRepositoryParams {
  data: Data
  include?: Include
}

export interface UpdateClassRepository {
  update(id: string, params: UpdateClassRepositoryParams): Promise<Class>
}
