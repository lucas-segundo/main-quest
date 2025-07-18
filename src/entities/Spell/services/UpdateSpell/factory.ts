import { PrismaUpdateSpellService } from './prisma'

export const makeUpdateSpellService = (): PrismaUpdateSpellService => {
  return new PrismaUpdateSpellService()
}
