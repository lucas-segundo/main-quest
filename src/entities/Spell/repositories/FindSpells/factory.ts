import { PrismaFindSpells } from './prisma'
import { FindSpellsRepository } from '.'

export const makeFindSpellsRepository = (): FindSpellsRepository => {
  return new PrismaFindSpells()
}
