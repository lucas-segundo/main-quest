import { Prisma } from '@prisma/client'
import { PrismaFindSubclass } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { NotFoundError } from 'app/errors/NotFoundError'
import { mockPrismaSubclass } from 'infra/prisma/data/Subclass/mock'
import { mockFindClassServiceParams } from 'domain/entities/Class/services/FindClass/mock'
import { mockFindSubclassServiceParams } from '../mock'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'

const makeSUT = () => {
  mockedPrismaClient.subclass.findFirst.mockResolvedValue(mockPrismaSubclass())

  const sut = new PrismaFindSubclass()
  return { sut }
}

describe('PrismaFindSubclass', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockFindSubclassServiceParams()
    await sut.find(params)

    const { filter } = params
    const expectedParams: Prisma.ClassFindFirstArgs<DefaultArgs> = {
      where: {
        id: Number(filter.id.equals),
      },
    }
    expect(mockedPrismaClient.subclass.findFirst).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should find a subclass', async () => {
    const { sut } = makeSUT()

    const params = mockFindClassServiceParams()
    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.findFirst.mockResolvedValue(prismaSubclass)

    const result = await sut.find(params)

    const expectedClass = adaptPrismaSubclass(prismaSubclass)
    expect(result).toEqual(expectedClass)
  })

  it('should throw if subclass not found', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.subclass.findFirst.mockResolvedValue(null)

    const params = mockFindClassServiceParams()
    await expect(sut.find(params)).rejects.toThrow(NotFoundError)
  })
})
