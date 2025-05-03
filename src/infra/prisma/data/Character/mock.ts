import { faker } from '@faker-js/faker'
import { PrismaCharacter } from '.'

export const mockPrismaCharacter = (): PrismaCharacter => ({
  id: faker.number.int({
    min: 1,
    max: 1000,
  }),
  name: faker.lorem.word(),
  classID: faker.number.int(),
  level: faker.number.int({
    min: 1,
    max: 100,
  }),
  strength: faker.number.int({
    min: 1,
    max: 20,
  }),
  dexterity: faker.number.int({
    min: 1,
    max: 20,
  }),
  constitution: faker.number.int({
    min: 1,
    max: 20,
  }),
  intelligence: faker.number.int({
    min: 1,
    max: 20,
  }),
  wisdom: faker.number.int({
    min: 1,
    max: 20,
  }),
  charisma: faker.number.int({
    min: 1,
    max: 20,
  }),
})
