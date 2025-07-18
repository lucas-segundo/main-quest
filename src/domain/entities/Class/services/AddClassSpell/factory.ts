import { PrismaAddClassSpellService } from './prisma'

export const makeAddClassSpellService = (): PrismaAddClassSpellService => {
  return new PrismaAddClassSpellService()
}
