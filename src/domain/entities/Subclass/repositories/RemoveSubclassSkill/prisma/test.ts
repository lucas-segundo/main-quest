import { Prisma } from '@prisma/client'
import { PrismaRemoveSubclassSkillRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaSubclass } from 'infra/prisma/data/Subclass/mock'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'
import { faker } from '@faker-js/faker'
import { mockRemoveSubclassSkillRepositoryParams } from '../mock'

const makeSUT = () => {
  const classID = faker.string.uuid()
  const skillIDs = [faker.string.uuid(), faker.string.uuid()]

  const sut = new PrismaRemoveSubclassSkillRepository()
  return { sut, classID, skillIDs }
}

describe('PrismaRemoveSubclassSkillRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, classID, skillIDs } = makeSUT()

    mockedPrismaClient.subclass.update.mockResolvedValue(mockPrismaSubclass())

    const params = mockRemoveSubclassSkillRepositoryParams()
    await sut.remove(classID, skillIDs, params)

    const { include } = params
    const expectedParams: Prisma.SubclassUpdateArgs<DefaultArgs> = {
      where: { id: Number(classID) },
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
            skill: include?.skills,
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

    const params = mockRemoveSubclassSkillRepositoryParams()
    const result = await sut.remove(classID, skillIDs, params)

    const expectedSubclass = adaptPrismaSubclass(prismaSubclass)
    expect(result).toEqual(expectedSubclass)
  })
})
