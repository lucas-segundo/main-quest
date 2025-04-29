import { Skill } from '@prisma/client'

export interface PrismaSubclassesSkills {
  id: number
  subclassID: number
  skillID: number
  skill: Skill
}
