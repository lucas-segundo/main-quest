import { Prisma } from '@prisma/client'
import { PrismaFindSpell } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { NotFoundError } from 'app/errors/NotFoundError'
import { mockPrismaSpell } from 'infra/prisma/data/Spell/mock'
import { mockFindClassRepositoryParams } from 'entities/Class/repositories/FindClass/mock'
import { mockFindSpellRepositoryParams } from '../mock'
import { adaptPrismaSpell } from 'infra/prisma/data/Spell/adapter'

const makeSUT = () => {
  mockedPrismaClient.spell.findFirst.mockResolvedValue(mockPrismaSpell())

  const sut = new PrismaFindSpell()
  return { sut }
}

describe('PrismaFindSpell', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    const params = mockFindSpellRepositoryParams()
    await sut.find(params)

    const { filter } = params
    const expectedParams: Prisma.ClassFindFirstArgs<DefaultArgs> = {
      where: {
        id: Number(filter.id.equals),
      },
    }
    expect(mockedPrismaClient.spell.findFirst).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should find a spell', async () => {
    const { sut } = makeSUT()

    const params = mockFindClassRepositoryParams()
    const prismaSpell = mockPrismaSpell()
    mockedPrismaClient.spell.findFirst.mockResolvedValue(prismaSpell)

    const result = await sut.find(params)

    const expectedClass = adaptPrismaSpell(prismaSpell)
    expect(result).toEqual(expectedClass)
  })

  it('should throw if spell not found', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.spell.findFirst.mockResolvedValue(null)

    const params = mockFindClassRepositoryParams()
    await expect(sut.find(params)).rejects.toThrow(NotFoundError)
  })
})
