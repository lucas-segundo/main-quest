import { PrismaAddSubclassSkillRepository } from './prisma'

export const makeAddSubclassSkillRepository =
  (): PrismaAddSubclassSkillRepository => {
    return new PrismaAddSubclassSkillRepository()
  }
