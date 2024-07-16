import { Prisma } from '@prisma/client'
import { PrismaClassFinderRepo } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { mockClassFinderRepoParams } from 'app/interfaces/ClassFinderRepo/mock'

const makeSUT = () => {
  mockedPrismaClient.class.findFirst.mockResolvedValue(mockPrismaClass())

  const sut = new PrismaClassFinderRepo()
  return { sut }
}

describe('PrismaClassFinderRepo', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockClassFinderRepoParams()
    await sut.find(params)

    const expectedParams: Prisma.ClassFindFirstArgs<DefaultArgs> = {
      where: {
        id: Number(params.id.equals),
      },
    }
    expect(mockedPrismaClient.class.findFirst).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should find a class', async () => {
    const { sut } = makeSUT()

    const params = mockClassFinderRepoParams()
    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.findFirst.mockResolvedValue(prismaClass)

    const result = await sut.find(params)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual(expectedClass)
  })
})
