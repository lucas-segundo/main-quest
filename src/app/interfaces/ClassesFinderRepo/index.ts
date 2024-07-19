import { Class } from 'domain/entities/Class'

interface Filter {
  name?: {
    like?: string
  }
}

interface Include {
  subclasses?: boolean
}

export interface ClassesFinderRepoParams {
  filter: Filter
  include?: Include
}

export interface ClassesFinderRepo {
  find(params: ClassesFinderRepoParams): Promise<Class[]>
}
