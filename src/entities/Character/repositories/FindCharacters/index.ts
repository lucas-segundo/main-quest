import { Character } from 'entities/Character'

interface Filter {
  name?: {
    like?: string
  }
  classID?: {
    equals?: string
  }
}

export interface FindCharactersRepositoryParams {
  filter: Filter
}

export interface FindCharactersRepository {
  find(params: FindCharactersRepositoryParams): Promise<Character[]>
}
