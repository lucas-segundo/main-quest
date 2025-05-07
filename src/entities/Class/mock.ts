import { Class } from '.'
import { faker } from '@faker-js/faker'
import { mockSubclass } from '../Subclass/mock'
import { mockSpell } from '../Spell/mock'

export const mockClass = (): Class => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  spellcastingAbility: faker.helpers.arrayElement([
    'intelligence',
    'wisdom',
    'charisma',
    null,
  ]),
  subclasses: [mockSubclass(), mockSubclass(), mockSubclass()],
  spells: [mockSpell(), mockSpell(), mockSpell()],
})
