import { Spell } from 'entities/Spell'

interface Data {
  name?: string
}

export interface UpdateSpellRepositoryParams {
  data: Data
}

export interface UpdateSpellRepository {
  update(id: string, params: UpdateSpellRepositoryParams): Promise<Spell>
}
