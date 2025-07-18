import { PrismaRemoveClassSpellService } from './prisma'

export const makeRemoveClassSpellService =
  (): PrismaRemoveClassSpellService => {
    return new PrismaRemoveClassSpellService()
  }
