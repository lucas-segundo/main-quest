import { Class, SpellcastingAbility } from 'entities/Class'

export interface CreateClassRepositoryParams {
  name: string
  spellCastingAbility: SpellcastingAbility | null
  hitDice: string
}

export interface CreateClassRepository {
  create(params: CreateClassRepositoryParams): Promise<Class>
}
