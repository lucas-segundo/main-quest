import { Prisma } from '@prisma/client'
import { PrismaFindSubclasses } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { NotFoundError } from 'domain/errors/NotFoundError'
import { mockPrismaSubclass } from 'infra/prisma/data/Subclass/mock'
import { mockFindClassRepositoryParams } from 'app/repositories/classes/FindClass/mock'
import { mockFindSubclassesParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.subclass.findFirst.mockResolvedValue(mockPrismaSubclass())

  const sut = new PrismaFindSubclasses()
  return { sut }
}

describe('PrismaFindSubclasses', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockFindSubclassesParams()
    await sut.find(params)

    const { filter } = params
    const expectedParams: Prisma.ClassFindFirstArgs<DefaultArgs> = {
      where: {
        id: Number(filter.id.equals),
      },
    }
    expect(mockedPrismaClient.class.findFirst).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should find a class', async () => {
    const { sut } = makeSUT()

    const params = mockFindClassRepositoryParams()
    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.findFirst.mockResolvedValue(prismaClass)

    const result = await sut.find(params)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual(expectedClass)
  })

  it('should throw if class not found', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.class.findFirst.mockResolvedValue(null)

    const params = mockFindClassRepositoryParams()
    await expect(sut.find(params)).rejects.toThrow(NotFoundError)
  })
})
