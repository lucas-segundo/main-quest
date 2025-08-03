import { Spell } from 'domain/entities/Spell'

interface Filter {
  id: {
    eq: string
  }
}

export interface FindSpellServiceParams {
  filter: Filter
}

export interface FindSpellService {
  find(params: FindSpellServiceParams): Promise<Spell>
}
