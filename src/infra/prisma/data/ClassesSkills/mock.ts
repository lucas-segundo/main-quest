import { faker } from '@faker-js/faker'
import { PrismaClassesSkills } from '.'
import { mockPrismaSkill } from '../Skill/mock'

export const mockPrismaClassesSkills = (): PrismaClassesSkills => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  classID: faker.number.int({ min: 1, max: 1000 }),
  skillID: faker.number.int({ min: 1, max: 1000 }),
  skill: mockPrismaSkill(),
})
