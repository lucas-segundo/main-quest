import { CharacterClass } from '.'
import { faker } from '@faker-js/faker'
import { mockSubclass } from '../Subclass/mock'

export const mockCharacterClass = (): CharacterClass => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  subclasses: [mockSubclass(), mockSubclass(), mockSubclass()],
})
