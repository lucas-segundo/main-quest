import { faker } from '@faker-js/faker'
import { PrismaSkill } from '.'

export const mockPrismaSkill = (): PrismaSkill => ({
  id: faker.number.int({
    min: 1,
    max: 1000,
  }),
  name: faker.lorem.word(),
})
