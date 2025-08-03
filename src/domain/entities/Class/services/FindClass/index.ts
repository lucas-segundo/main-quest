import { Class } from 'domain/entities/Class'

interface Filter {
  id: {
    eq: string
  }
}

interface Include {
  subclasses?: boolean
  spells?: boolean
}

export interface FindClassServiceParams {
  filter: Filter
  include?: Include
}

export interface FindClassService {
  find(params: FindClassServiceParams): Promise<Class>
}
