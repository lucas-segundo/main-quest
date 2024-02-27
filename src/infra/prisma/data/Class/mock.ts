import { faker } from '@faker-js/faker'
import { PrismaClass } from '.'

export const mockPrismaClass = (): PrismaClass => ({
  id: faker.number.int(),
  name: faker.lorem.word(),
})
