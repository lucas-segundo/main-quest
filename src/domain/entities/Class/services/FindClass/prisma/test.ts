import { Prisma } from '@prisma/client'
import { PrismaFindClassService } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/data/Class/adapter'
import { NotFoundError } from 'app/errors/NotFoundError'
import { mockFindClassServiceParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.class.findFirst.mockResolvedValue(mockPrismaClass())

  const sut = new PrismaFindClassService()
  return { sut }
}

describe('PrismaFindClassService', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockFindClassServiceParams()
    await sut.find(params)

    const { filter, include } = params
    const expectedParams: Prisma.ClassFindFirstArgs<DefaultArgs> = {
      where: {
        id: Number(filter.id.eq),
      },
      include: {
        subclasses: include?.subclasses,
        classesSpells: {
          include: {
            spell: include?.spells,
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

    const params = mockFindClassServiceParams()
    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.findFirst.mockResolvedValue(prismaClass)

    const result = await sut.find(params)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual(expectedClass)
  })

  it('should throw if class not found', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.class.findFirst.mockResolvedValue(null)

    const params = mockFindClassServiceParams()
    await expect(sut.find(params)).rejects.toThrow(NotFoundError)
  })
})
