import { PrismaRemoveClassSpellRepository } from './prisma'

export const makeRemoveClassSpellRepository =
  (): PrismaRemoveClassSpellRepository => {
    return new PrismaRemoveClassSpellRepository()
  }
