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

export interface FindSpellsRepositoryParams {
  filter: Filter
}

export interface FindSpellsRepository {
  find(params: FindSpellsRepositoryParams): Promise<Spell[]>
}
