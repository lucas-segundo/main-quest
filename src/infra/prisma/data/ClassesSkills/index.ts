import { Skill } from '@prisma/client'

export interface PrismaClassesSkills {
  id: number
  classID: number
  skillID: number
  skill: Skill
}
