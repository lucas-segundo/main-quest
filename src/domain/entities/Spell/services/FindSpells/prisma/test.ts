import { Prisma } from '@prisma/client'
import { PrismaFindSpells } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSpell } from 'infra/prisma/data/Spell/mock'
import { mockFindSpellsServiceParams } from '../mock'
import { adaptPrismaSpell } from 'infra/prisma/data/Spell/adapter'

const makeSUT = () => {
  mockedPrismaClient.spell.findFirst.mockResolvedValue(mockPrismaSpell())

  const sut = new PrismaFindSpells()
  return { sut }
}

describe('PrismaFindSpells', () => {
  it('should call prisma client with right params', async () => {
    const { sut } = makeSUT()
    const prismaSpells = [mockPrismaSpell(), mockPrismaSpell()]
    mockedPrismaClient.spell.findMany.mockResolvedValue(prismaSpells)

    const params = mockFindSpellsServiceParams()
    await sut.find(params)

    const { filter } = params
    const expectedParams: Prisma.SpellFindManyArgs<DefaultArgs> = {
      where: {
        name: {
          contains: filter.name?.like,
        },
        classesSpells: {
          some: {
            classID: Number(filter.classID?.eq),
          },
        },
        subclassesSpells: {
          some: {
            subclassID: Number(filter.subclassID?.eq),
          },
        },
      },
    }
    expect(mockedPrismaClient.spell.findMany).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should find a spells', async () => {
    const { sut } = makeSUT()
    const params = mockFindSpellsServiceParams()

    const prismaSpells = [mockPrismaSpell(), mockPrismaSpell()]
    mockedPrismaClient.spell.findMany.mockResolvedValue(prismaSpells)

    const result = await sut.find(params)

    const expectedClass = prismaSpells.map((spell) => adaptPrismaSpell(spell))
    expect(result).toEqual(expectedClass)
  })
})
