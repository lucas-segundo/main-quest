import { Class } from 'domain/entities/Class'

interface Filter {
  id: {
    equals: string
  }
}

interface Include {
  subclasses?: boolean
}

export interface FindClassRepositoryParams {
  filter: Filter
  include?: Include
}

export interface FindClassRepository {
  find(params: FindClassRepositoryParams): Promise<Class>
}
