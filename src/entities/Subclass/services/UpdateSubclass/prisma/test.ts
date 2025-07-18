import { Prisma } from '@prisma/client'
import { PrismaUpdateSubclassService } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSubclass } from 'infra/prisma/data/Subclass/mock'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'
import { faker } from '@faker-js/faker'
import { mockUpdateSubclassServiceParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.subclass.update.mockResolvedValue(mockPrismaSubclass())
  const id = faker.string.uuid()

  const sut = new PrismaUpdateSubclassService()
  return { sut, id }
}

describe('PrismaUpdateSubclassService', () => {
  it('should call prisma client with right params', async () => {
    const { sut, id } = makeSUT()

    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.update.mockResolvedValue(prismaSubclass)

    const params = mockUpdateSubclassServiceParams()
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

    const result = await sut.update(id, mockUpdateSubclassServiceParams())

    const expectedSubclass = adaptPrismaSubclass(prismaSubclass)
    expect(result).toEqual(expectedSubclass)
  })
})
