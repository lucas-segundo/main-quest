import { Prisma } from '@prisma/client'
import { PrismaUpdateSkillRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSkill } from 'infra/prisma/data/Skill/mock'
import { adaptPrismaSkill } from 'infra/prisma/adapters/adaptPrismaSkill'
import { faker } from '@faker-js/faker'
import { mockUpdateSkillRepositoryParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.skill.update.mockResolvedValue(mockPrismaSkill())
  const id = faker.string.uuid()

  const sut = new PrismaUpdateSkillRepository()
  return { sut, id }
}

describe('PrismaUpdateSkillRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, id } = makeSUT()

    const prismaSkill = mockPrismaSkill()
    mockedPrismaClient.skill.update.mockResolvedValue(prismaSkill)

    const params = mockUpdateSkillRepositoryParams()
    await sut.update(id, params)

    const { data } = params
    const expectedParams: Prisma.SkillUpdateArgs<DefaultArgs> = {
      data: {
        name: data.name,
      },
      where: {
        id: Number(id),
      },
    }
    expect(mockedPrismaClient.skill.update).toHaveBeenCalledWith(expectedParams)
  })

  it('should return a Skill after update', async () => {
    const { sut, id } = makeSUT()

    const prismaSkill = mockPrismaSkill()
    mockedPrismaClient.skill.update.mockResolvedValue(prismaSkill)

    const result = await sut.update(id, mockUpdateSkillRepositoryParams())

    const expectedSkill = adaptPrismaSkill(prismaSkill)
    expect(result).toEqual(expectedSkill)
  })
})
