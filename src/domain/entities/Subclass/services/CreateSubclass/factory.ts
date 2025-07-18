import { PrismaCreateSubclassService } from './prisma'

export const makeCreateSubclassService = (): PrismaCreateSubclassService => {
  return new PrismaCreateSubclassService()
}
