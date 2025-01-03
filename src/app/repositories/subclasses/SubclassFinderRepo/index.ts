import { Subclass } from 'domain/entities/Subclass'

interface Filter {
  id: {
    equals: string
  }
}

export interface SubclassFinderRepoParams {
  filter: Filter
}

export interface SubclassFinderRepo {
  find(params: SubclassFinderRepoParams): Promise<Subclass>
}
