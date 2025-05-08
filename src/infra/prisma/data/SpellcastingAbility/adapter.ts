import { SpellcastingAbility } from 'entities/Class'
import { PrismaSpellcastingAbility } from '.'

const spellcastingAbilityMap = {
  INT: 'intelligence',
  WIS: 'wisdom',
  CHA: 'charisma',
}

export const adaptSpellcastingAbility = (
  spellcastingAbility: PrismaSpellcastingAbility,
) => {
  return spellcastingAbilityMap[spellcastingAbility] as SpellcastingAbility
}

export const adaptToPrismaSpellcastingAbility = (
  spellcastingAbility: SpellcastingAbility,
) => {
  return Object.keys(spellcastingAbilityMap).find(
    (key) => spellcastingAbilityMap[key] === spellcastingAbility,
  ) as SpellcastingAbility
}
