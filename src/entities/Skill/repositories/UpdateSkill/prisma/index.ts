import { Skill } from 'entities/Skill'
import prisma from 'infra/prisma'
import { adaptPrismaSkill } from 'infra/prisma/adapters/adaptPrismaSkill'
import { UpdateSkillRepository, UpdateSkillRepositoryParams } from '..'

export class PrismaUpdateSkillRepository implements UpdateSkillRepository {
  async update(
    id: string,
    params: UpdateSkillRepositoryParams,
  ): Promise<Skill> {
    const { data } = params
    const prismaSkill = await prisma.skill.update({
      data: {
        name: data.name,
      },
      where: {
        id: Number(id),
      },
    })

    return adaptPrismaSkill(prismaSkill)
  }
}
