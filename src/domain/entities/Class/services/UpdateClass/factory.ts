import { PrismaUpdateClassService } from './prisma'

export const makeUpdateClassService = (): PrismaUpdateClassService => {
  return new PrismaUpdateClassService()
}
