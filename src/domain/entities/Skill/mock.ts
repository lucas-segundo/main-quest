import { faker } from '@faker-js/faker'
import { Skill } from '.'

export const mockSkill = (): Skill => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
})
