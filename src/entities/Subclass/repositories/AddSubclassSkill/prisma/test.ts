import { PrismaAddSubclassSkillRepository } from '.'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSubclass } from 'infra/prisma/data/Subclass/mock'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  const subclassID = faker.string.uuid()
  const skillIDs = [faker.string.uuid(), faker.string.uuid()]

  const sut = new PrismaAddSubclassSkillRepository()
  return { sut, subclassID, skillIDs }
}

describe('PrismaAddSubclassSkillRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, subclassID, skillIDs } = makeSUT()

    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.findFirstOrThrow.mockResolvedValueOnce(
      prismaSubclass,
    )

    await sut.add(subclassID, skillIDs)

    expect(mockedPrismaClient.subclassesSkills.createMany).toHaveBeenCalledWith(
      {
        data: skillIDs.map((skillID) => ({
          subclassID: Number(subclassID),
          skillID: Number(skillID),
        })),
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

    const result = await sut.add(subclassID, skillIDs)

    const expectedSubclass = adaptPrismaSubclass(prismaSubclass)
    expect(result).toEqual(expectedSubclass)
  })
})
