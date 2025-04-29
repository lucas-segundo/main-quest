import { Class } from 'domain/entities/Class'

export interface CreateClassRepositoryParams {
  name: string
}

export interface CreateClassRepository {
  create(params: CreateClassRepositoryParams): Promise<Class>
}
