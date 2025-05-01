import { PrismaRemoveSubclassSkillRepository } from './prisma'

export const makeRemoveSubclassSkillRepository =
  (): PrismaRemoveSubclassSkillRepository => {
    return new PrismaRemoveSubclassSkillRepository()
  }
