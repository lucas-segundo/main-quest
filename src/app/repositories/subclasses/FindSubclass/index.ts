import { Subclass } from 'domain/entities/Subclass'

interface Filter {
  id: {
    equals: string
  }
}

export interface FindSubclassesParams {
  filter: Filter
}

export interface FindSubclasses {
  find(params: FindSubclassesParams): Promise<Subclass>
}
