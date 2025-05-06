import { Class } from '.'
import { faker } from '@faker-js/faker'
import { mockSubclass } from '../Subclass/mock'
import { mockSkill } from '../Skill/mock'

export const mockClass = (): Class => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  subclasses: [mockSubclass(), mockSubclass(), mockSubclass()],
  skills: [mockSkill(), mockSkill(), mockSkill()],
})
