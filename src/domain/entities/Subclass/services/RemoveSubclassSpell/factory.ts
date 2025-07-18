import { PrismaRemoveSubclassSpellService } from './prisma'

export const makeRemoveSubclassSpellService =
  (): PrismaRemoveSubclassSpellService => {
    return new PrismaRemoveSubclassSpellService()
  }
