import { Prisma } from '@prisma/client'
import { PrismaFindClassesRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { mockFindClassesRepositoryParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.class.findMany.mockResolvedValue([mockPrismaClass()])

  const sut = new PrismaFindClassesRepository()
  return { sut }
}

describe('PrismaFindClassesRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockFindClassesRepositoryParams()
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

    const params = mockFindClassesRepositoryParams()
    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.findMany.mockResolvedValue([prismaClass])

    const result = await sut.find(params)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual([expectedClass])
  })
})
