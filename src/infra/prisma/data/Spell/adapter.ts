import { Spell } from 'entities/Spell'
import { PrismaSpell } from 'infra/prisma/data/Spell'

export const adaptPrismaSpell = (data: PrismaSpell): Spell => {
  return {
    id: data.id.toString(),
    name: data.name,
  }
}
