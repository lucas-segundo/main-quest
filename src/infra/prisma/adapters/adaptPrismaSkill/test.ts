import { Skill } from 'entities/Skill'
import { adaptPrismaSkill } from './index'
import { mockPrismaSkill } from 'infra/prisma/data/Skill/mock'

describe('adaptPrismaSkill', () => {
  it('should correctly adapt a PrismaSubclass to a Skill', () => {
    const prismaSubclass = mockPrismaSkill()

    const expectedSubclass: Skill = {
      id: prismaSubclass.id.toString(),
      name: prismaSubclass.name,
    }

    const result = adaptPrismaSkill(prismaSubclass)

    expect(result).toEqual(expectedSubclass)
  })
})
