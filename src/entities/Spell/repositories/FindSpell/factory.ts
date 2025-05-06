import { PrismaFindSpell } from './prisma'
import { FindSpellRepository } from '.'

export const makeFindSpellRepository = (): FindSpellRepository => {
  return new PrismaFindSpell()
}
