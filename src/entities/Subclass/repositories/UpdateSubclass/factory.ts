import { PrismaUpdateSubclassRepository } from './prisma'

export const makeCreateClassRepository = (): PrismaUpdateSubclassRepository => {
  return new PrismaUpdateSubclassRepository()
}
