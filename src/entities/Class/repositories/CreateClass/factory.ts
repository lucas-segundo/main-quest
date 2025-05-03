import { PrismaCreateClassRepository } from './prisma'

export const makeCreateClassRepository = (): PrismaCreateClassRepository => {
  return new PrismaCreateClassRepository()
}
