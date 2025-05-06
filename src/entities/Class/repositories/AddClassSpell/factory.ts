import { PrismaAddClassSpellRepository } from './prisma'

export const makeAddClassSpellRepository =
  (): PrismaAddClassSpellRepository => {
    return new PrismaAddClassSpellRepository()
  }
