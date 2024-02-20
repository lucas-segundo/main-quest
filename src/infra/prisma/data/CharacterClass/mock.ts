import { faker } from '@faker-js/faker'
import { PrismaCharacterClass } from '.'

export const mockPrismaCharacterClass = (): PrismaCharacterClass => ({
  id: faker.number.int(),
  name: faker.lorem.word(),
})
