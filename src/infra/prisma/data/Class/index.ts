import { PrismaSubclass } from '../Subclass'
import { PrismaClassesSkills } from '../ClassesSkills'

export interface PrismaClass {
  id: number
  name: string
  subclasses?: PrismaSubclass[]
  classesSkills?: PrismaClassesSkills[]
}
