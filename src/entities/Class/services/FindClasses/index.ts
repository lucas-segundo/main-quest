import { Class } from 'entities/Class'

interface Filter {
  name?: {
    like?: string
  }
}

interface Include {
  subclasses?: boolean
}

export interface FindClassesServiceParams {
  filter: Filter
  include?: Include
}

export interface FindClassesService {
  find(params: FindClassesServiceParams): Promise<Class[]>
}
