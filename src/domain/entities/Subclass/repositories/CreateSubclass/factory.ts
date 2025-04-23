import { PrismaCreateSubclassRepository } from './prisma'

export const makeCreateSubclassRepository =
  (): PrismaCreateSubclassRepository => {
    return new PrismaCreateSubclassRepository()
  }
