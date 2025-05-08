import { Prisma } from '@prisma/client'
import { PrismaUpdateClassRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/data/Class/adapter'
import { faker } from '@faker-js/faker'
import { mockUpdateClassRepositoryParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.class.update.mockResolvedValue(mockPrismaClass())
  const id = faker.string.uuid()

  const sut = new PrismaUpdateClassRepository()
  return { sut, id }
}

describe('PrismaUpdateClassRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, id } = makeSUT()

    const params = mockUpdateClassRepositoryParams()
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

    const result = await sut.update(id, mockUpdateClassRepositoryParams())

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual(expectedClass)
  })
})
