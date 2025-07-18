import { PrismaCreateSpellService } from './prisma'

export const makeCreateSpellService = (): PrismaCreateSpellService => {
  return new PrismaCreateSpellService()
}
