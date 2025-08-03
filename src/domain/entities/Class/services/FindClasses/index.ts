import { Class } from 'domain/entities/Class'

interface Filter {
  name?: {
    lk?: string
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
