import { faker } from '@faker-js/faker'
import { Character } from '.'

export const mockCharacter = (): Character => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  healthPoints: faker.number.int({ min: 1, max: 100 }),
  maxHealthPoints: faker.number.int({ min: 1, max: 100 }),
  level: faker.number.int({ min: 1, max: 100 }),
  classID: faker.string.uuid(),
  strength: faker.number.int({ min: 1, max: 20 }),
  dexterity: faker.number.int({ min: 1, max: 20 }),
  constitution: faker.number.int({ min: 1, max: 20 }),
  intelligence: faker.number.int({ min: 1, max: 20 }),
  wisdom: faker.number.int({ min: 1, max: 20 }),
  charisma: faker.number.int({ min: 1, max: 20 }),
})
