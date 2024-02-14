import { CharacterClass } from '.'
import { faker } from '@faker-js/faker'

export const mockCharacterClass = (): CharacterClass => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
})
