import { Prisma } from '@prisma/client'
import { PrismaClassesFinderRepo } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { mockClassesFinderRepoParams } from 'app/interfaces/classes/ClassesFinderRepo/mock'

const makeSUT = () => {
  mockedPrismaClient.class.findMany.mockResolvedValue([mockPrismaClass()])

  const sut = new PrismaClassesFinderRepo()
  return { sut }
}

describe('PrismaClassesFinderRepo', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockClassesFinderRepoParams()
    await sut.find(params)

    const { filter, include } = params
    const expectedParams: Prisma.ClassFindManyArgs<DefaultArgs> = {
      where: {
        name: {
          contains: filter.name?.like,
        },
      },
      include,
    }
    expect(mockedPrismaClient.class.findMany).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should find classes', async () => {
    const { sut } = makeSUT()

    const params = mockClassesFinderRepoParams()
    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.findMany.mockResolvedValue([prismaClass])

    const result = await sut.find(params)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual([expectedClass])
  })
})
