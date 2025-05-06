import { faker } from '@faker-js/faker'
import { PrismaSpell } from '.'

export const mockPrismaSpell = (): PrismaSpell => ({
  id: faker.number.int({
    min: 1,
    max: 1000,
  }),
  name: faker.lorem.word(),
})
