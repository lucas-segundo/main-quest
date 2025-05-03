import { Skill } from 'entities/Skill'
import prisma from 'infra/prisma'
import { adaptPrismaSkill } from 'infra/prisma/adapters/adaptPrismaSkill'
import { FindSkillsRepository, FindSkillsRepositoryParams } from '..'

export class PrismaFindSkills implements FindSkillsRepository {
  async find(params: FindSkillsRepositoryParams): Promise<Skill[]> {
    const { filter } = params
    const prismaSkills = await prisma.skill.findMany({
      where: {
        name: {
          contains: filter.name?.like,
        },
        classesSkills: {
          some: {
            classID: Number(filter.classID?.equals),
          },
        },
        subclassesSkills: {
          some: {
            subclassID: Number(filter.subclassID?.equals),
          },
        },
      },
    })

    return prismaSkills.map((skill) => adaptPrismaSkill(skill))
  }
}
