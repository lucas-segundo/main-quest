import { Spell } from 'entities/Spell'

interface Data {
  name?: string
}

export interface UpdateSpellServiceParams {
  data: Data
}

export interface UpdateSpellService {
  update(id: string, params: UpdateSpellServiceParams): Promise<Spell>
}
