import { Spell } from 'entities/Spell'

export interface CreateSpellRepositoryParams {
  name: string
}

export interface CreateSpellRepository {
  create(params: CreateSpellRepositoryParams): Promise<Spell>
}
