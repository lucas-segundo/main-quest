import { faker } from '@faker-js/faker'
import { PrismaClass } from '.'
import { mockPrismaSubclass } from '../Subclass/mock'
import { mockPrismaClassesSpells } from '../ClassesSpells/mock'

export const mockPrismaClass = (): PrismaClass => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.lorem.word(),
  spellcastingAbility: faker.helpers.arrayElement(['INT', 'WIS', 'CHA', null]),
  subclasses: [mockPrismaSubclass()],
  classesSpells: [mockPrismaClassesSpells()],
})
