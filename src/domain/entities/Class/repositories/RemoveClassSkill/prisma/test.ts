import { Prisma } from '@prisma/client'
import { PrismaRemoveClassSkillRepository } from '.'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { faker } from '@faker-js/faker'
import { mockRemoveClassSkillRepositoryParams } from '../mock'

const makeSUT = () => {
  const classID = faker.string.uuid()
  const skillIDs = [faker.string.uuid(), faker.string.uuid()]

  const sut = new PrismaRemoveClassSkillRepository()
  return { sut, classID, skillIDs }
}

describe('PrismaRemoveClassSkillRepository', () => {
  it('should call prisma client with right params', async () => {
    const { sut, classID, skillIDs } = makeSUT()

    mockedPrismaClient.class.update.mockResolvedValue(mockPrismaClass())

    const params = mockRemoveClassSkillRepositoryParams()
    await sut.remove(classID, skillIDs, params)

    const { include } = params
    const expectedParams: Prisma.ClassUpdateArgs<DefaultArgs> = {
      where: { id: Number(classID) },
      data: {
        classesSkills: {
          deleteMany: {
            classID: Number(classID),
            skillID: {
              in: skillIDs.map((skillID) => Number(skillID)),
            },
          },
        },
      },
      include: {
        classesSkills: {
          include: {
            skill: include?.skills,
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

    const params = mockRemoveClassSkillRepositoryParams()
    const result = await sut.remove(classID, skillIDs, params)

    const expectedClass = adaptPrismaClass(prismaClass)
    expect(result).toEqual(expectedClass)
  })
})
