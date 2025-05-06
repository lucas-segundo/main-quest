import { Prisma } from '@prisma/client'
import { PrismaUpdateSubclassRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSubclass } from 'infra/prisma/data/Subclass/mock'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'
import { faker } from '@faker-js/faker'
import { mockUpdateSubclassRepositoryParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.subclass.update.mockResolvedValue(mockPrismaSubclass())
  const id = faker.string.uuid()

  const sut = new PrismaUpdateSubclassRepository()
  return { sut, id }
}

describe('PrismaUpdateSubclassRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, id } = makeSUT()

    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.update.mockResolvedValue(prismaSubclass)

    const params = mockUpdateSubclassRepositoryParams()
    await sut.update(id, params)

    const { data } = params
    const expectedParams: Prisma.SubclassUpdateArgs<DefaultArgs> = {
      data: {
        name: data.name,
      },
      where: {
        id: Number(id),
      },
    }
    expect(mockedPrismaClient.subclass.update).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should return a Subclass after update', async () => {
    const { sut, id } = makeSUT()

    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.update.mockResolvedValue(prismaSubclass)

    const result = await sut.update(id, mockUpdateSubclassRepositoryParams())

    const expectedSubclass = adaptPrismaSubclass(prismaSubclass)
    expect(result).toEqual(expectedSubclass)
  })
})
