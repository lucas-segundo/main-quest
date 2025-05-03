import { PrismaRemoveClassSkillRepository } from './prisma'

export const makeRemoveClassSkillRepository =
  (): PrismaRemoveClassSkillRepository => {
    return new PrismaRemoveClassSkillRepository()
  }
