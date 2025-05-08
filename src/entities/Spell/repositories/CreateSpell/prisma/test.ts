import { Prisma } from '@prisma/client'
import { PrismaCreateSpellRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSpell } from 'infra/prisma/data/Spell/mock'
import { adaptPrismaSpell } from 'infra/prisma/data/Spell/adapter'
import { mockCreateSpellRepositoryParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.spell.create.mockResolvedValue(mockPrismaSpell())

  const sut = new PrismaCreateSpellRepository()
  return { sut }
}

describe('PrismaCreateSpellRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.spell.create.mockResolvedValue(mockPrismaSpell())
    const params = mockCreateSpellRepositoryParams()
    await sut.create(params)

    const expectedParams: Prisma.SpellCreateArgs<DefaultArgs> = {
      data: {
        name: params.name,
      },
    }
    expect(mockedPrismaClient.spell.create).toHaveBeenCalledWith(expectedParams)
  })

  it('should return a Spell after creation', async () => {
    const { sut } = makeSUT()

    const prismaSpell = mockPrismaSpell()
    mockedPrismaClient.spell.create.mockResolvedValue(prismaSpell)

    const result = await sut.create(mockCreateSpellRepositoryParams())

    const expectedSpell = adaptPrismaSpell(prismaSpell)
    expect(result).toEqual(expectedSpell)
  })
})
