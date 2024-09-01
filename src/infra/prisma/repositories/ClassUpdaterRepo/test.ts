import { Prisma } from '@prisma/client'
import { PrismaClassUpdaterRepo } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { mockClassUpdaterRepoParams } from 'app/interfaces/classes/ClassUpdaterRepo/mock'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  mockedPrismaClient.class.update.mockResolvedValue(mockPrismaClass())
  const id = faker.string.uuid()

  const sut = new PrismaClassUpdaterRepo()
  return { sut, id }
}

describe('PrismaClassUpdaterRepo', () => {
  it('should call prisma client with right params', async () => {
    const { sut, id } = makeSUT()

    const params = mockClassUpdaterRepoParams()
    await sut.update(id, params)

    const { data, include } = params
    const expectedParams: Prisma.ClassUpdateArgs<DefaultArgs> = {
      data: {
        name: data.name,
      },
      where: {
        id: Number(id),
      },
      include,
    }
    expect(mockedPrismaClient.class.update).toHaveBeenCalledWith(expectedParams)
  })

  it('should return a Class after update', async () => {
    const { sut, id } = makeSUT()

    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.update.mockResolvedValue(prismaClass)

    const result = await sut.update(id, mockClassUpdaterRepoParams())

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual(expectedClass)
  })
})
