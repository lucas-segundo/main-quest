import { SpellcastingAbility } from 'entities/Class'

export interface LearnedSpell {
  id: string
  characterID: string
  spellID: string
  spellCastingAbility: SpellcastingAbility
}
