import { Prisma } from '@prisma/client'
import { PrismaCreateSkillRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSkill } from 'infra/prisma/data/Skill/mock'
import { adaptPrismaSkill } from 'infra/prisma/adapters/adaptPrismaSkill'
import { mockCreateSkillRepositoryParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.skill.create.mockResolvedValue(mockPrismaSkill())

  const sut = new PrismaCreateSkillRepository()
  return { sut }
}

describe('PrismaCreateSkillRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.skill.create.mockResolvedValue(mockPrismaSkill())
    const params = mockCreateSkillRepositoryParams()
    await sut.create(params)

    const expectedParams: Prisma.SkillCreateArgs<DefaultArgs> = {
      data: {
        name: params.name,
      },
    }
    expect(mockedPrismaClient.skill.create).toHaveBeenCalledWith(expectedParams)
  })

  it('should return a Skill after creation', async () => {
    const { sut } = makeSUT()

    const prismaSkill = mockPrismaSkill()
    mockedPrismaClient.skill.create.mockResolvedValue(prismaSkill)

    const result = await sut.create(mockCreateSkillRepositoryParams())

    const expectedSkill = adaptPrismaSkill(prismaSkill)
    expect(result).toEqual(expectedSkill)
  })
})
