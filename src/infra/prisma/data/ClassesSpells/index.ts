import { Spell } from '@prisma/client'

export interface PrismaClassesSpells {
  id: number
  classID: number
  spellID: number
  spell: Spell
}
