import { Prisma } from '@prisma/client'
import { PrismaFindClassRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { NotFoundError } from 'app/errors/NotFoundError'
import { mockFindClassRepositoryParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.class.findFirst.mockResolvedValue(mockPrismaClass())

  const sut = new PrismaFindClassRepository()
  return { sut }
}

describe('PrismaFindClassRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockFindClassRepositoryParams()
    await sut.find(params)

    const { filter, include } = params
    const expectedParams: Prisma.ClassFindFirstArgs<DefaultArgs> = {
      where: {
        id: Number(filter.id.equals),
      },
      include: {
        subclasses: include?.subclasses,
        classesSkills: {
          include: {
            skill: include?.skills,
          },
        },
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
