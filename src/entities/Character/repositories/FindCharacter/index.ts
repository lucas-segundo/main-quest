import { Character } from 'entities/Character'

interface Filter {
  id?: {
    equals?: string
  }
  name?: {
    like?: string
  }
}

export interface FindCharacterRepositoryParams {
  filter: Filter
}

export interface FindCharacterRepository {
  find(params: FindCharacterRepositoryParams): Promise<Character | null>
}
