import { PrismaCreateSpellRepository } from './prisma'

export const makeCreateSpellRepository = (): PrismaCreateSpellRepository => {
  return new PrismaCreateSpellRepository()
}
