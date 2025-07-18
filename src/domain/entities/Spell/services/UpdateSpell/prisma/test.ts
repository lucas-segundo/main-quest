import { Prisma } from '@prisma/client'
import { PrismaUpdateSpellService } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSpell } from 'infra/prisma/data/Spell/mock'
import { adaptPrismaSpell } from 'infra/prisma/data/Spell/adapter'
import { faker } from '@faker-js/faker'
import { mockUpdateSpellServiceParams } from '../mock'

const makeSUT = () => {
  mockedPrismaClient.spell.update.mockResolvedValue(mockPrismaSpell())
  const id = faker.string.uuid()

  const sut = new PrismaUpdateSpellService()
  return { sut, id }
}

describe('PrismaUpdateSpellService', () => {
  it('should call prisma client with right params', async () => {
    const { sut, id } = makeSUT()

    const prismaSpell = mockPrismaSpell()
    mockedPrismaClient.spell.update.mockResolvedValue(prismaSpell)

    const params = mockUpdateSpellServiceParams()
    await sut.update(id, params)

    const { data } = params
    const expectedParams: Prisma.SpellUpdateArgs<DefaultArgs> = {
      data: {
        name: data.name,
      },
      where: {
        id: Number(id),
      },
    }
    expect(mockedPrismaClient.spell.update).toHaveBeenCalledWith(expectedParams)
  })

  it('should return a Spell after update', async () => {
    const { sut, id } = makeSUT()

    const prismaSpell = mockPrismaSpell()
    mockedPrismaClient.spell.update.mockResolvedValue(prismaSpell)

    const result = await sut.update(id, mockUpdateSpellServiceParams())

    const expectedSpell = adaptPrismaSpell(prismaSpell)
    expect(result).toEqual(expectedSpell)
  })
})
