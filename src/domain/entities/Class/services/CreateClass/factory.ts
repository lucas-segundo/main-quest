import { PrismaCreateClassService } from './prisma'

export const makeCreateClassService = (): PrismaCreateClassService => {
  return new PrismaCreateClassService()
}
