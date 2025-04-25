import { Skill } from 'domain/entities/Skill'
import prisma from 'infra/prisma'
import { adaptPrismaSkill } from 'infra/prisma/adapters/adaptPrismaSkill'
import { CreateSkillRepository, CreateSkillRepositoryParams } from '..'

export class PrismaCreateSkillRepository implements CreateSkillRepository {
  async create(params: CreateSkillRepositoryParams): Promise<Skill> {
    const prismaSkill = await prisma.skill.create({
      data: {
        name: params.name,
      },
    })

    return adaptPrismaSkill(prismaSkill)
  }
}
