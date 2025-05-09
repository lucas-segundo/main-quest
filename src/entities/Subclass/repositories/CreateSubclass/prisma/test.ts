import { Prisma } from '@prisma/client'
import { PrismaCreateSubclassRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSubclass } from 'infra/prisma/data/Subclass/mock'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'
import { mockCreateSubclassRepositoryParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.subclass.create.mockResolvedValue(mockPrismaSubclass())

  const sut = new PrismaCreateSubclassRepository()
  return { sut }
}

describe('PrismaCreateSubclassRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.subclass.create.mockResolvedValue(mockPrismaSubclass())
    const params = mockCreateSubclassRepositoryParams()
    await sut.create(params)

    const expectedParams: Prisma.SubclassCreateArgs<DefaultArgs> = {
      data: {
        classID: Number(params.classID),
        name: params.name,
      },
    }
    expect(mockedPrismaClient.subclass.create).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should return a Subclass after creation', async () => {
    const { sut } = makeSUT()

    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.create.mockResolvedValue(prismaSubclass)

    const result = await sut.create(mockCreateSubclassRepositoryParams())

    const expectedSubclass = adaptPrismaSubclass(prismaSubclass)
    expect(result).toEqual(expectedSubclass)
  })
})
