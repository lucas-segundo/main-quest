import { Subclass } from 'entities/Subclass'

interface Filter {
  id: {
    equals: string
  }
}

export interface FindSubclassServiceParams {
  filter: Filter
}

export interface FindSubclassService {
  find(params: FindSubclassServiceParams): Promise<Subclass>
}
