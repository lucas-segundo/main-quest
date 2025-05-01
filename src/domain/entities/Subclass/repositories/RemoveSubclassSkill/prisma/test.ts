import { Prisma } from '@prisma/client'
import { PrismaRemoveSubclassSkillRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
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

    mockedPrismaClient.subclass.update.mockResolvedValue(mockPrismaSubclass())

    await sut.remove(subclassID, skillIDs)

    const expectedParams: Prisma.SubclassUpdateArgs<DefaultArgs> = {
      where: { id: Number(subclassID) },
      data: {
        subclassesSkills: {
          deleteMany: {
            skillID: {
              in: skillIDs.map((skillID) => Number(skillID)),
            },
          },
        },
      },
      include: {
        subclassesSkills: {
          include: {
            skill: true,
          },
        },
      },
    }
    expect(mockedPrismaClient.subclass.update).toHaveBeenCalledWith(
      expectedParams,
    )
  })

  it('should return a Subclass after update', async () => {
    const { sut, subclassID, skillIDs } = makeSUT()

    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.update.mockResolvedValue(prismaSubclass)

    const result = await sut.remove(subclassID, skillIDs)

    const expectedSubclass = adaptPrismaSubclass(prismaSubclass)
    expect(result).toEqual(expectedSubclass)
  })
})
