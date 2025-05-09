import { PrismaSubclass } from '../Subclass'
import { PrismaClassesSpells } from '../ClassesSpells'

export interface PrismaClass {
  id: number
  name: string
  hitDice: string
  spellcastingAbility: 'CHA' | 'WIS' | 'INT' | null
  subclasses?: PrismaSubclass[]
  classesSpells?: PrismaClassesSpells[]
}
