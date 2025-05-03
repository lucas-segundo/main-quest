import { Skill } from 'entities/Skill'
import { NotFoundError } from 'app/errors/NotFoundError'
import prisma from 'infra/prisma'
import { adaptPrismaSkill } from 'infra/prisma/adapters/adaptPrismaSkill'
import { FindSkillRepository, FindSkillRepositoryParams } from '..'

export class PrismaFindSkill implements FindSkillRepository {
  async find(params: FindSkillRepositoryParams): Promise<Skill> {
    const { filter } = params
    const prismaSkill = await prisma.skill.findFirst({
      where: {
        id: Number(filter.id.equals),
      },
    })

    if (prismaSkill) {
      return adaptPrismaSkill(prismaSkill)
    } else {
      throw new NotFoundError('Skill')
    }
  }
}
