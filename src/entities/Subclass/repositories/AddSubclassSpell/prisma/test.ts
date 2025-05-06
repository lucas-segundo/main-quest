import { PrismaAddSubclassSpellRepository } from '.'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSubclass } from 'infra/prisma/data/Subclass/mock'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  const subclassID = faker.string.uuid()
  const spellIDs = [faker.string.uuid(), faker.string.uuid()]

  const sut = new PrismaAddSubclassSpellRepository()
  return { sut, subclassID, spellIDs }
}

describe('PrismaAddSubclassSpellRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, subclassID, spellIDs } = makeSUT()

    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.findFirstOrThrow.mockResolvedValueOnce(
      prismaSubclass,
    )

    await sut.add(subclassID, spellIDs)

    expect(mockedPrismaClient.subclassesSpells.createMany).toHaveBeenCalledWith(
      {
        data: spellIDs.map((spellID) => ({
          subclassID: Number(subclassID),
          spellID: Number(spellID),
        })),
      },
    )
    expect(mockedPrismaClient.subclass.findFirstOrThrow).toHaveBeenCalledWith({
      where: {
        id: Number(subclassID),
      },
      include: {
        subclassesSpells: {
          include: {
            spell: true,
          },
        },
      },
    })
  })

  it('should return a Subclass after update', async () => {
    const { sut, subclassID, spellIDs } = makeSUT()

    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.findFirstOrThrow.mockResolvedValueOnce(
      prismaSubclass,
    )

    const result = await sut.add(subclassID, spellIDs)

    const expectedSubclass = adaptPrismaSubclass(prismaSubclass)
    expect(result).toEqual(expectedSubclass)
  })
})
