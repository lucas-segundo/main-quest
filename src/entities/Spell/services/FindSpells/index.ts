import { Spell } from 'entities/Spell'

interface Filter {
  name?: {
    like?: string
  }
  classID?: {
    equals?: string
  }
  subclassID?: {
    equals?: string
  }
}

export interface FindSpellsServiceParams {
  filter: Filter
}

export interface FindSpellsService {
  find(params: FindSpellsServiceParams): Promise<Spell[]>
}
