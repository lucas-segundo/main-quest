import { PrismaCreateSkillRepository } from './prisma'

export const makeCreateSkillRepository = (): PrismaCreateSkillRepository => {
  return new PrismaCreateSkillRepository()
}
