import { Spell } from 'domain/entities/Spell'

interface Filter {
  name?: {
    lk?: string
  }
  classID?: {
    eq?: string
  }
  subclassID?: {
    eq?: string
  }
}

export interface FindSpellsServiceParams {
  filter: Filter
}

export interface FindSpellsService {
  find(params: FindSpellsServiceParams): Promise<Spell[]>
}
