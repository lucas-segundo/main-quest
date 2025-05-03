import { Character } from 'entities/Character'

export interface CreateCharacterRepositoryParams {
  name: string
  classID: string
  level: number
}

export interface CreateCharacterRepository {
  create(params: CreateCharacterRepositoryParams): Promise<Character>
}
