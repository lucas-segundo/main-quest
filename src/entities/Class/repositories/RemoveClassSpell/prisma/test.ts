import { PrismaRemoveClassSpellRepository } from '.'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  const classID = faker.string.uuid()
  const spellIDs = [faker.string.uuid(), faker.string.uuid()]

  const sut = new PrismaRemoveClassSpellRepository()
  return { sut, classID, spellIDs }
}

describe('PrismaRemoveClassSpellRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, classID, spellIDs } = makeSUT()

    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.findFirstOrThrow.mockResolvedValueOnce(prismaClass)
    await sut.remove(classID, spellIDs)

    expect(mockedPrismaClient.classesSpells.deleteMany).toHaveBeenCalledWith({
      where: {
        classID: Number(classID),
        spellID: {
          in: spellIDs.map((spellID) => Number(spellID)),
        },
      },
    })
    expect(mockedPrismaClient.class.findFirstOrThrow).toHaveBeenCalledWith({
      where: {
        id: Number(classID),
      },
      include: {
        classesSpells: {
          include: {
            spell: true,
          },
        },
      },
    })
  })

  it('should return a Class after update', async () => {
    const { sut, classID, spellIDs } = makeSUT()

    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.findFirstOrThrow.mockResolvedValueOnce(prismaClass)

    const result = await sut.remove(classID, spellIDs)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual(expectedClass)
  })
})
