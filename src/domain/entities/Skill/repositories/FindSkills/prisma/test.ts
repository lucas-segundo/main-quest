import { Prisma } from '@prisma/client'
import { PrismaFindSkill } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSkill } from 'infra/prisma/data/Skill/mock'
import { mockFindSkillsRepositoryParams } from '../mock'
import { adaptPrismaSkill } from 'infra/prisma/adapters/adaptPrismaSkill'

const makeSUT = () => {
  mockedPrismaClient.skill.findFirst.mockResolvedValue(mockPrismaSkill())

  const sut = new PrismaFindSkill()
  return { sut }
}

describe('PrismaFindSkill', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()
    const prismaSkills = [mockPrismaSkill(), mockPrismaSkill()]
    mockedPrismaClient.skill.findMany.mockResolvedValue(prismaSkills)

    const params = mockFindSkillsRepositoryParams()
    await sut.find(params)

    const { filter } = params
    const expectedParams: Prisma.SkillFindManyArgs<DefaultArgs> = {
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
    }
    expect(mockedPrismaClient.skill.findMany).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should find a skills', async () => {
    const { sut } = makeSUT()
    const params = mockFindSkillsRepositoryParams()

    const prismaSkills = [mockPrismaSkill(), mockPrismaSkill()]
    mockedPrismaClient.skill.findMany.mockResolvedValue(prismaSkills)

    const result = await sut.find(params)

    const expectedClass = prismaSkills.map((skill) => adaptPrismaSkill(skill))
    expect(result).toEqual(expectedClass)
  })
})
