import { PrismaAddSubclassSpellRepository } from './prisma'

export const makeAddSubclassSpellRepository =
  (): PrismaAddSubclassSpellRepository => {
    return new PrismaAddSubclassSpellRepository()
  }
