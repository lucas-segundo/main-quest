import { PrismaFindClassService } from './prisma'

export const makeFindClassService = (): PrismaFindClassService => {
  return new PrismaFindClassService()
}
