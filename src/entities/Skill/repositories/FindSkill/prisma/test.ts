import { Prisma } from '@prisma/client'
import { PrismaFindSkill } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { NotFoundError } from 'domain/errors/NotFoundError'
import { mockPrismaSkill } from 'infra/prisma/data/Skill/mock'
import { mockFindClassRepositoryParams } from 'entities/Class/repositories/FindClass/mock'
import { mockFindSkillRepositoryParams } from '../mock'
import { adaptPrismaSkill } from 'infra/prisma/adapters/adaptPrismaSkill'

const makeSUT = () => {
  mockedPrismaClient.skill.findFirst.mockResolvedValue(mockPrismaSkill())

  const sut = new PrismaFindSkill()
  return { sut }
}

describe('PrismaFindSkill', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockFindSkillRepositoryParams()
    await sut.find(params)

    const { filter } = params
    const expectedParams: Prisma.ClassFindFirstArgs<DefaultArgs> = {
      where: {
        id: Number(filter.id.equals),
      },
    }
    expect(mockedPrismaClient.skill.findFirst).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should find a skill', async () => {
    const { sut } = makeSUT()

    const params = mockFindClassRepositoryParams()
    const prismaSkill = mockPrismaSkill()
    mockedPrismaClient.skill.findFirst.mockResolvedValue(prismaSkill)

    const result = await sut.find(params)

    const expectedClass = adaptPrismaSkill(prismaSkill)
    expect(result).toEqual(expectedClass)
  })

  it('should throw if skill not found', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.skill.findFirst.mockResolvedValue(null)

    const params = mockFindClassRepositoryParams()
    await expect(sut.find(params)).rejects.toThrow(NotFoundError)
  })
})
