import { PrismaFindSkills } from './prisma'
import { FindSkillsRepository } from '.'

export const makeFindSkillsRepository = (): FindSkillsRepository => {
  return new PrismaFindSkills()
}
