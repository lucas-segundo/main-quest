import { Character } from 'domain/entities/Character'

interface Data {
  name?: string
  level?: number
  hitPoints?: number
  maxHitPoints?: number
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
}

export interface UpdateCharacterServiceParams {
  data: Data
}

export interface UpdateCharacterService {
  update(id: string, params: UpdateCharacterServiceParams): Promise<Character>
}
