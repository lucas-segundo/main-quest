import { Class } from 'domain/entities/Class'

export interface CreateClassRepositoryParams {
  name: string
  skillIDs?: number[]
}

export interface CreateClassRepository {
  create(params: CreateClassRepositoryParams): Promise<Class>
}
