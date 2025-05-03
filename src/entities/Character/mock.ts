import { faker } from '@faker-js/faker'
import { Character } from '.'

export const mockCharacter = (): Character => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  level: faker.number.int({ min: 1, max: 100 }),
  classID: faker.string.uuid(),
})
