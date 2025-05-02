import { Character } from 'domain/entities/Character'

interface Filter {
  id: {
    equals: string
  }
}

export interface FindCharacterRepositoryParams {
  filter: Filter
}

export interface FindCharacterRepository {
  find(params: FindCharacterRepositoryParams): Promise<Character>
}
