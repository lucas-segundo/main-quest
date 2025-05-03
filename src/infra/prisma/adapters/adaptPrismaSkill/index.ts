import { Skill } from 'entities/Skill'
import { PrismaSkill } from 'infra/prisma/data/Skill'

export const adaptPrismaSkill = (data: PrismaSkill): Skill => {
  return {
    id: data.id.toString(),
    name: data.name,
  }
}
