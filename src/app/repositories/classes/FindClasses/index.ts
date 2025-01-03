import { Class } from 'domain/entities/Class'

interface Filter {
  name?: {
    like?: string
  }
}

interface Include {
  subclasses?: boolean
}

export interface FindClassesRepositoryParams {
  filter: Filter
  include?: Include
}

export interface FindClassesRepository {
  find(params: FindClassesRepositoryParams): Promise<Class[]>
}
