import { faker } from '@faker-js/faker'
import { Character } from '.'
import { mockSpell } from '../Spell/mock'

export const mockCharacter = (): Character => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  hitPoints: faker.number.int({ min: 1, max: 100 }),
  maxHitPoints: faker.number.int({ min: 1, max: 100 }),
  level: faker.number.int({ min: 1, max: 100 }),
  classID: faker.string.uuid(),
  strength: faker.number.int({ min: 1, max: 20 }),
  dexterity: faker.number.int({ min: 1, max: 20 }),
  constitution: faker.number.int({ min: 1, max: 20 }),
  intelligence: faker.number.int({ min: 1, max: 20 }),
  wisdom: faker.number.int({ min: 1, max: 20 }),
  charisma: faker.number.int({ min: 1, max: 20 }),
  spells: [mockSpell(), mockSpell()],
})
