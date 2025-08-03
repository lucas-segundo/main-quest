import { Prisma } from '@prisma/client'
import { PrismaFindClassesService } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/data/Class/adapter'
import { mockFindClassesServiceParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.class.findMany.mockResolvedValue([mockPrismaClass()])

  const sut = new PrismaFindClassesService()
  return { sut }
}

describe('PrismaFindClassesService', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockFindClassesServiceParams()
    await sut.find(params)

    const { filter, include } = params
    const expectedParams: Prisma.ClassFindManyArgs<DefaultArgs> = {
      where: {
        name: {
          contains: filter.name?.lk,
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

    const params = mockFindClassesServiceParams()
    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.findMany.mockResolvedValue([prismaClass])

    const result = await sut.find(params)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual([expectedClass])
  })
})
