import { PrismaUpdateClassRepository } from './prisma'

export const makeUpdateClassRepository = (): PrismaUpdateClassRepository => {
  return new PrismaUpdateClassRepository()
}
