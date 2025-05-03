import { Character } from 'entities/Character'

export interface CreateCharacterRepositoryParams {
  name: string
  classID: string
  level: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

export interface CreateCharacterRepository {
  create(params: CreateCharacterRepositoryParams): Promise<Character>
}
