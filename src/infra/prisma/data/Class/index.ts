import { PrismaSubclass } from '../Subclass'
import { PrismaClassesSpells } from '../ClassesSpells'

export interface PrismaClass {
  id: number
  name: string
  subclasses?: PrismaSubclass[]
  classesSpells?: PrismaClassesSpells[]
}
