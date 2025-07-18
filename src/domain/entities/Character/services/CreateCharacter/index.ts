import { Character } from 'domain/entities/Character'

export type CreateCharacterServiceParams = Omit<Character, 'id'>

export interface CreateCharacterService {
  create(params: CreateCharacterServiceParams): Promise<Character>
}
