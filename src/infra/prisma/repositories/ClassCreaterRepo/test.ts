import { Prisma } from '@prisma/client'
import { PrismaClassCreaterRepo } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { mockClassCreaterRepoParams } from 'app/interfaces/ClassCreaterRepo/mock'

const makeSUT = () => {
  mockedPrismaClient.class.create.mockResolvedValue(mockPrismaClass())

  const sut = new PrismaClassCreaterRepo()
  return { sut }
}

describe('PrismaClassCreaterRepo', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockClassCreaterRepoParams()
    await sut.create(params)

    const expectedParams: Prisma.ClassCreateArgs<DefaultArgs> = {
      data: {
        name: params.name,
      },
    }
    expect(mockedPrismaClient.class.create).toHaveBeenCalledWith(expectedParams)
  })

  it('should return a Class after creation', async () => {
    const { sut } = makeSUT()

    const params = mockClassCreaterRepoParams()
    const prismaClass = { ...mockPrismaClass(), ...params }
    mockedPrismaClient.class.create.mockResolvedValue(prismaClass)

    const result = await sut.create(params)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual(expectedClass)
  })
})
