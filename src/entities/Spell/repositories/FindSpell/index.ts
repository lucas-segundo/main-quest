import { Spell } from 'entities/Spell'

interface Filter {
  id: {
    equals: string
  }
}

export interface FindSpellRepositoryParams {
  filter: Filter
}

export interface FindSpellRepository {
  find(params: FindSpellRepositoryParams): Promise<Spell>
}
