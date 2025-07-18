import { Character } from 'domain/entities/Character'

interface Data {
  name?: string
}

export interface UpdateCharacterServiceParams {
  data: Data
}

export interface UpdateCharacterService {
  update(id: string, params: UpdateCharacterServiceParams): Promise<Character>
}
