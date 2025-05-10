import { faker } from '@faker-js/faker'
import { SpellcastingAbility } from 'entities/Class'

export const mockLearnedSpell = () => {
  return {
    id: faker.string.uuid(),
    characterID: faker.string.uuid(),
    spellID: faker.string.uuid(),
    spellCastingAbility: faker.helpers.arrayElement([
      'intelligence',
      'wisdom',
      'charisma',
    ]) as SpellcastingAbility,
  }
}
