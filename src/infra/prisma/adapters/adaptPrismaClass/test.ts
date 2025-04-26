import { Class } from 'domain/entities/Class'
import { adaptPrismaClass } from './index'
import { mockPrismaClass } from 'infra/prisma/data/Class/mock'

describe('adaptPrismaClass', () => {
  it('should correctly adapt a PrismaClass to a Class', () => {
    const prismaClass = mockPrismaClass()

    const expectedClass: Class = {
      id: prismaClass.id.toString(),
      name: prismaClass.name,
      subclasses: prismaClass.subclasses.map((subclass) => ({
        id: subclass.id.toString(),
        name: subclass.name,
      })),
      skills:
        prismaClass.classesSkills?.map((classSkill) => ({
          id: classSkill.skill.id.toString(),
          name: classSkill.skill.name,
        })) || [],
    }

    const result = adaptPrismaClass(prismaClass)

    expect(result).toEqual(expectedClass)
  })
})
