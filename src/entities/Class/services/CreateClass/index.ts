import { Class, SpellcastingAbility } from 'entities/Class'

export interface CreateClassServiceParams {
  name: string
  spellCastingAbility: SpellcastingAbility | null
  hitDice: string
}

export interface CreateClassService {
  create(params: CreateClassServiceParams): Promise<Class>
}
