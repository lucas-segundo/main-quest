import { Character } from 'entities/Character'

export type CreateCharacterRepositoryParams = Omit<Character, 'id'>

export interface CreateCharacterRepository {
  create(params: CreateCharacterRepositoryParams): Promise<Character>
}
