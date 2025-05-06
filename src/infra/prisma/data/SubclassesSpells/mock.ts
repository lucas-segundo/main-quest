import { faker } from '@faker-js/faker'
import { PrismaSubclassesSpells } from '.'
import { mockPrismaSpell } from '../Spell/mock'

export const mockPrismaSubclassesSpells = (): PrismaSubclassesSpells => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  subclassID: faker.number.int({ min: 1, max: 1000 }),
  spellID: faker.number.int({ min: 1, max: 1000 }),
  spell: mockPrismaSpell(),
})
