import { faker } from '@faker-js/faker'
import { PrismaClass } from '.'
import { mockPrismaSubclass } from '../Subclass/mock'
import { mockPrismaClassesSpells } from '../ClassesSpells/mock'

export const mockPrismaClass = (): PrismaClass => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.lorem.word(),
  hitDice: faker.helpers.arrayElement(['1d4', '1d6', '1d8', '1d10', '1d12']),
  spellcastingAbility: faker.helpers.arrayElement(['INT', 'WIS', 'CHA', null]),
  subclasses: [mockPrismaSubclass()],
  classesSpells: [mockPrismaClassesSpells()],
})
