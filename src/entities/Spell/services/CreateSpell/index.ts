import { Spell } from 'entities/Spell'

export interface CreateSpellServiceParams {
  name: string
}

export interface CreateSpellService {
  create(params: CreateSpellServiceParams): Promise<Spell>
}
