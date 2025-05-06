import { faker } from '@faker-js/faker'
import { PrismaClassesSpells } from '.'
import { mockPrismaSpell } from '../Spell/mock'

export const mockPrismaClassesSpells = (): PrismaClassesSpells => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  classID: faker.number.int({ min: 1, max: 1000 }),
  spellID: faker.number.int({ min: 1, max: 1000 }),
  spell: mockPrismaSpell(),
})
