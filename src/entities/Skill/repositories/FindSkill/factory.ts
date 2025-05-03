import { PrismaFindSkill } from './prisma'
import { FindSkillRepository } from '.'

export const makeFindSkillRepository = (): FindSkillRepository => {
  return new PrismaFindSkill()
}
