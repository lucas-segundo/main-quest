import { SpellcastingAbility } from 'domain/entities/Class'

export interface LearnedSpell {
  id: string
  characterID: string
  spellID: string
  spellCastingAbility: SpellcastingAbility
}
