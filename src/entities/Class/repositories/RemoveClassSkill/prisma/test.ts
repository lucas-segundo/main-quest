import { PrismaRemoveClassSkillRepository } from '.'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  const classID = faker.string.uuid()
  const skillIDs = [faker.string.uuid(), faker.string.uuid()]

  const sut = new PrismaRemoveClassSkillRepository()
  return { sut, classID, skillIDs }
}

describe('PrismaRemoveClassSkillRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, classID, skillIDs } = makeSUT()

    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.findFirstOrThrow.mockResolvedValueOnce(prismaClass)
    await sut.remove(classID, skillIDs)

    expect(mockedPrismaClient.classesSkills.deleteMany).toHaveBeenCalledWith({
      where: {
        classID: Number(classID),
        skillID: {
          in: skillIDs.map((skillID) => Number(skillID)),
        },
      },
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

    const result = await sut.remove(classID, skillIDs)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual(expectedClass)
  })
})
