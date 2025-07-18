import { Class, SpellcastingAbility } from 'domain/entities/Class'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'
import { PrismaClass } from 'infra/prisma/data/Class'

export const spellcastingAbilityMap = {
  INT: 'intelligence',
  WIS: 'wisdom',
  CHA: 'charisma',
}

export const adaptPrismaClass = (prismaClass: PrismaClass): Class => {
  return {
    id: prismaClass.id.toString(),
    name: prismaClass.name,
    hitDice: prismaClass.hitDice,
    spellcastingAbility: adaptSpellcastingAbility(
      prismaClass.spellcastingAbility,
    ),
    subclasses: prismaClass.subclasses?.map((subclass) =>
      adaptPrismaSubclass(subclass),
    ),
    spells: prismaClass.classesSpells?.map((classSpell) => ({
      id: classSpell.spell.id.toString(),
      name: classSpell.spell.name,
    })),
  }
}

const adaptSpellcastingAbility = (
  prismaSpellcastingAbiliy: PrismaClass['spellcastingAbility'],
) => {
  return prismaSpellcastingAbiliy === null
    ? null
    : (spellcastingAbilityMap[prismaSpellcastingAbiliy] as SpellcastingAbility)
}

export const adaptToPrismaSpellcastingAbility = (
  spellcastingAbility: SpellcastingAbility | null,
): PrismaClass['spellcastingAbility'] => {
  return spellcastingAbility === null
    ? null
    : (Object.keys(spellcastingAbilityMap).find(
        (key) => spellcastingAbilityMap[key] === spellcastingAbility,
      ) as PrismaClass['spellcastingAbility'])
}
