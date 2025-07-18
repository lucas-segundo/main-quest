import { PrismaUpdateSubclassService } from './prisma'

export const makeCreateClassService = (): PrismaUpdateSubclassService => {
  return new PrismaUpdateSubclassService()
}
