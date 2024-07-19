import { Class } from 'domain/entities/Class'

interface Filter {
  id: {
    equals: string
  }
}

interface Include {
  subclasses?: boolean
}

export interface ClassFinderRepoParams {
  filter: Filter
  include?: Include
}

export interface ClassFinderRepo {
  find(params: ClassFinderRepoParams): Promise<Class>
}
