import { Subclass } from 'entities/Subclass'

interface Filter {
  id: {
    equals: string
  }
}

export interface FindSubclassRepositoryParams {
  filter: Filter
}

export interface FindSubclassRepository {
  find(params: FindSubclassRepositoryParams): Promise<Subclass>
}
