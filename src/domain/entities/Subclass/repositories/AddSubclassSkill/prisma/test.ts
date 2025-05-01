import { Prisma } from '@prisma/client'
import { PrismaAddSubclassSkillRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSubclass } from 'infra/prisma/data/Subclass/mock'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  const classID = faker.string.uuid()
  const skillIDs = [faker.string.uuid(), faker.string.uuid()]

  const sut = new PrismaAddSubclassSkillRepository()
  return { sut, classID, skillIDs }
}

describe('PrismaAddSubclassSkillRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, classID, skillIDs } = makeSUT()

    mockedPrismaClient.subclass.update.mockResolvedValue(mockPrismaSubclass())

    await sut.add(classID, skillIDs)

    const expectedParams: Prisma.SubclassUpdateArgs<DefaultArgs> = {
      where: { id: Number(classID) },
      data: {
        subclassesSkills: {
          createMany: {
            data: skillIDs.map((skillID) => ({
              skillID: Number(skillID),
            })),
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
    const { sut, classID, skillIDs } = makeSUT()

    const prismaSubclass = mockPrismaSubclass()
    mockedPrismaClient.subclass.update.mockResolvedValue(prismaSubclass)

    const result = await sut.add(classID, skillIDs)

    const expectedSubclass = adaptPrismaSubclass(prismaSubclass)
    expect(result).toEqual(expectedSubclass)
  })
})
