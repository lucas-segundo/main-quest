import { PrismaUpdateSpellRepository } from './prisma'

export const makeUpdateSpellRepository = (): PrismaUpdateSpellRepository => {
  return new PrismaUpdateSpellRepository()
}
