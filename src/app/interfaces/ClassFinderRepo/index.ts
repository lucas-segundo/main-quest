import { Class } from 'domain/entities/Class'

export interface ClassFinderRepoParams {
  id: {
    equals: string
  }
}

export interface ClassFinderRepo {
  find(params: ClassFinderRepoParams): Promise<Class>
}
