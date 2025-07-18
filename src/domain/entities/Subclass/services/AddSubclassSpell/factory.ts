import { PrismaAddSubclassSpellService } from './prisma'

export const makeAddSubclassSpellService =
  (): PrismaAddSubclassSpellService => {
    return new PrismaAddSubclassSpellService()
  }
