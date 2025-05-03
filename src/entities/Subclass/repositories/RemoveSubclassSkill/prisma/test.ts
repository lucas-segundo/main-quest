import { PrismaRemoveSubclassSkillRepository } from '.'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSubclass } from 'infra/prisma/data/Subclass/mock'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  const subclassID = faker.string.uuid()
  const skillIDs = [faker.string.uuid(), faker.string.uuid()]

  const sut = new PrismaRemoveSubclassSkillRepository()
  return { sut, subclassID, skillIDs }
}

describe('PrismaRemoveSubclassSkillRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, subclassID, skillIDs } = makeSUT()

    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.findFirstOrThrow.mockResolvedValueOnce(
      prismaSubclass,
    )
    await sut.remove(subclassID, skillIDs)

    expect(mockedPrismaClient.subclassesSkills.deleteMany).toHaveBeenCalledWith(
      {
        where: {
          subclassID: Number(subclassID),
          skillID: {
            in: skillIDs.map((skillID) => Number(skillID)),
          },
        },
      },
    )
    expect(mockedPrismaClient.subclass.findFirstOrThrow).toHaveBeenCalledWith({
      where: {
        id: Number(subclassID),
      },
      include: {
        subclassesSkills: {
          include: {
            skill: true,
          },
        },
      },
    })
  })

  it('should return a Subclass after update', async () => {
    const { sut, subclassID, skillIDs } = makeSUT()

    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.findFirstOrThrow.mockResolvedValueOnce(
      prismaSubclass,
    )

    const result = await sut.remove(subclassID, skillIDs)

    const expectedSubclass = adaptPrismaSubclass(prismaSubclass)
    expect(result).toEqual(expectedSubclass)
  })
})
