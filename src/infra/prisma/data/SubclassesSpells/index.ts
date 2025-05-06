import { Spell } from '@prisma/client'

export interface PrismaSubclassesSpells {
  id: number
  subclassID: number
  spellID: number
  spell: Spell
}
