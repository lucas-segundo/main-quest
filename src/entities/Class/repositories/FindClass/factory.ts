import { PrismaFindClassRepository } from './prisma'

export const makeFindClassRepository = (): PrismaFindClassRepository => {
  return new PrismaFindClassRepository()
}
