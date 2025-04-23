import { PrismaFindClassesRepository } from './prisma'

export const makeFindClassesRepository = (): PrismaFindClassesRepository => {
  return new PrismaFindClassesRepository()
}
