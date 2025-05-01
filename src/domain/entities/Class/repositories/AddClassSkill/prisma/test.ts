import { PrismaAddClassSkillRepository } from '.'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  const classID = faker.string.uuid()
  const skillIDs = [faker.string.uuid(), faker.string.uuid()]

  const sut = new PrismaAddClassSkillRepository()
  return { sut, classID, skillIDs }
}

describe('PrismaAddClassSkillRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, classID, skillIDs } = makeSUT()

    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.findFirstOrThrow.mockResolvedValueOnce(prismaClass)

    await sut.add(classID, skillIDs)

    expect(mockedPrismaClient.classesSkills.createMany).toHaveBeenCalledWith({
      data: skillIDs.map((skillID) => ({
        classID: Number(classID),
        skillID: Number(skillID),
      })),
    })
    expect(mockedPrismaClient.class.findFirstOrThrow).toHaveBeenCalledWith({
      where: {
        id: Number(classID),
      },
      include: {
        classesSkills: {
          include: {
            skill: true,
          },
        },
      },
    })
  })

  it('should return a Class after update', async () => {
    const { sut, classID, skillIDs } = makeSUT()

    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.findFirstOrThrow.mockResolvedValueOnce(prismaClass)

    const result = await sut.add(classID, skillIDs)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual(expectedClass)
  })
})
