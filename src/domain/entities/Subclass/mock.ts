import { faker } from '@faker-js/faker'
import { Subclass } from '.'

export const mockSubclass = (): Subclass => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
})
