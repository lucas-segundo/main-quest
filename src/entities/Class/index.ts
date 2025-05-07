import { Spell } from '../Spell'
import { Subclass } from '../Subclass'

export type SpellcastingAbility = 'intelligence' | 'wisdom' | 'charisma'

export interface Class {
  id: string
  name: string
  spellcastingAbility: SpellcastingAbility | null
  subclasses?: Subclass[]
  spells?: Spell[]
}
