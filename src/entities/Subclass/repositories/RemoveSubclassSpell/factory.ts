import { PrismaRemoveSubclassSpellRepository } from './prisma'

export const makeRemoveSubclassSpellRepository =
  (): PrismaRemoveSubclassSpellRepository => {
    return new PrismaRemoveSubclassSpellRepository()
  }
