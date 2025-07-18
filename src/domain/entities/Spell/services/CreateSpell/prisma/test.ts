import { Prisma } from '@prisma/client'
import { PrismaCreateSpellService } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSpell } from 'infra/prisma/data/Spell/mock'
import { adaptPrismaSpell } from 'infra/prisma/data/Spell/adapter'
import { mockCreateSpellServiceParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.spell.create.mockResolvedValue(mockPrismaSpell())

  const sut = new PrismaCreateSpellService()
  return { sut }
}

describe('PrismaCreateSpellService', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()

    mockedPrismaClient.spell.create.mockResolvedValue(mockPrismaSpell())
    const params = mockCreateSpellServiceParams()
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

    const result = await sut.create(mockCreateSpellServiceParams())

    const expectedSpell = adaptPrismaSpell(prismaSpell)
    expect(result).toEqual(expectedSpell)
  })
})
