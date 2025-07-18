import { PrismaFindSpell } from './prisma'
import { FindSpellService } from '.'

export const makeFindSpellService = (): FindSpellService => {
  return new PrismaFindSpell()
}
