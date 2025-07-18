import { Character } from 'domain/entities/Character'

interface Filter {
  id?: {
    equals?: string
  }
  name?: {
    like?: string
  }
}

export interface FindCharacterServiceParams {
  filter: Filter
}

export interface FindCharacterService {
  find(params: FindCharacterServiceParams): Promise<Character | null>
}
