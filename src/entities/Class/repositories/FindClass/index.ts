import { Class } from 'entities/Class'

interface Filter {
  id: {
    equals: string
  }
}

interface Include {
  subclasses?: boolean
  skills?: boolean
}

export interface FindClassRepositoryParams {
  filter: Filter
  include?: Include
}

export interface FindClassRepository {
  find(params: FindClassRepositoryParams): Promise<Class>
}
