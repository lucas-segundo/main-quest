import { PrismaAddClassSkillRepository } from './prisma'

export const makeAddClassSkillRepository =
  (): PrismaAddClassSkillRepository => {
    return new PrismaAddClassSkillRepository()
  }
