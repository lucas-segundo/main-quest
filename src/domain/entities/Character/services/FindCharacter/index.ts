import { Character } from 'domain/entities/Character'

interface Filter {
  id?: {
    eq?: string
  }
  name?: {
    lk?: string
  }
}

export interface FindCharacterServiceParams {
  filter: Filter
}

export interface FindCharacterService {
  find(params: FindCharacterServiceParams): Promise<Character | null>
}
