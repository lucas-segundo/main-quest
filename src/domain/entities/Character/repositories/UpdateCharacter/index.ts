import { Character } from 'domain/entities/Character'

interface Data {
  name?: string
}

export interface UpdateCharacterRepositoryParams {
  data: Data
}

export interface UpdateCharacterRepository {
  update(
    id: string,
    params: UpdateCharacterRepositoryParams,
  ): Promise<Character>
}
