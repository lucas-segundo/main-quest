import { Subclass } from 'domain/entities/Subclass'

interface Filter {
  id: {
    equals: string
  }
}

export interface FindSubclassParams {
  filter: Filter
}

export interface FindSubclass {
  find(params: FindSubclassParams): Promise<Subclass>
}
