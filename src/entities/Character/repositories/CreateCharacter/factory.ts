import { PrismaCreateCharacterRepository } from './prisma'

export const makeCreateCharacterRepository =
  (): PrismaCreateCharacterRepository => {
    return new PrismaCreateCharacterRepository()
  }
