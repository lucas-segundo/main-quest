import { faker } from '@faker-js/faker'
import { PrismaSubclass } from '.'

export const mockPrismaSubclass = (): PrismaSubclass => ({
  id: faker.number.int(),
  name: faker.lorem.word(),
  classID: faker.number.int(),
})
