import { Prisma } from '@prisma/client'
import { PrismaAddClassSkillRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
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

    mockedPrismaClient.class.update.mockResolvedValue(mockPrismaClass())

    await sut.add(classID, skillIDs)

    const expectedParams: Prisma.ClassUpdateArgs<DefaultArgs> = {
      where: { id: Number(classID) },
      data: {
        classesSkills: {
          createMany: {
            data: skillIDs.map((skillID) => ({
              skillID: Number(skillID),
            })),
          },
        },
      },
      include: {
        classesSkills: {
          include: {
            skill: true,
          },
        },
      },
    }
    expect(mockedPrismaClient.class.update).toHaveBeenCalledWith(expectedParams)
  })

  it('should return a Class after update', async () => {
    const { sut, classID, skillIDs } = makeSUT()

    const prismaClass = mockPrismaClass()
    mockedPrismaClient.class.update.mockResolvedValue(prismaClass)

    const result = await sut.add(classID, skillIDs)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual(expectedClass)
  })
})
