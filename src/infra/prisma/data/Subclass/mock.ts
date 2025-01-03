import { faker } from '@faker-js/faker'
import { PrismaSubclass } from '.'

export const mockPrismaSubclass = (): PrismaSubclass => ({
  id: faker.number.int({
    min: 1,
    max: 1000,
  }),
  name: faker.lorem.word(),
  classID: faker.number.int(),
})
