import { faker } from '@faker-js/faker'
import { PrismaSubclassesSkills } from '.'
import { mockPrismaSkill } from '../Skill/mock'

export const mockPrismaSubclassesSkills = (): PrismaSubclassesSkills => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  subclassID: faker.number.int({ min: 1, max: 1000 }),
  skillID: faker.number.int({ min: 1, max: 1000 }),
  skill: mockPrismaSkill(),
})
