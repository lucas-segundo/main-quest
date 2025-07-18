import { faker } from '@faker-js/faker'
import { Spell } from '.'

export const mockSpell = (): Spell => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
})
