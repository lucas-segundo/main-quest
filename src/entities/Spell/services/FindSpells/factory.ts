import { PrismaFindSpells } from './prisma'
import { FindSpellsService } from '.'

export const makeFindSpellsService = (): FindSpellsService => {
  return new PrismaFindSpells()
}
