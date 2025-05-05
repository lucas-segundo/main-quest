import { PrismaSubclass } from '../Subclass'
import { PrismaClassesSkills } from '../ClassesSkills'

export interface PrismaClass {
  id: number
  name: string
  spellcastingAbility: 'CHA' | 'WIS' | 'INT' | null
  subclasses?: PrismaSubclass[]
  classesSkills?: PrismaClassesSkills[]
}
