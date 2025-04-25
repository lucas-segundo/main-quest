import { PrismaUpdateSkillRepository } from './prisma'

export const makeUpdateSkillRepository = (): PrismaUpdateSkillRepository => {
  return new PrismaUpdateSkillRepository()
}
