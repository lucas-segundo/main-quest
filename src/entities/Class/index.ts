import { Skill } from '../Skill'
import { Subclass } from '../Subclass'

export type SpellcastingAbility = 'intelligence' | 'wisdom' | 'charisma'

export interface Class {
  id: string
  name: string
  spellcastingAbility: SpellcastingAbility | null
  subclasses?: Subclass[]
  skills?: Skill[]
}
