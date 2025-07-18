import { PrismaFindClassesService } from './prisma'

export const makeFindClassesService = (): PrismaFindClassesService => {
  return new PrismaFindClassesService()
}
