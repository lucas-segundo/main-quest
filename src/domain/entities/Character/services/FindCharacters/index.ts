import { Character } from 'domain/entities/Character'

interface Filter {
  name?: {
    like?: string
  }
  classID?: {
    equals?: string
  }
}

export interface FindCharactersServiceParams {
  filter: Filter
}

export interface FindCharactersService {
  find(params: FindCharactersServiceParams): Promise<Character[]>
}
