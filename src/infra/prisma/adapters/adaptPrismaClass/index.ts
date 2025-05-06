import { Class, SpellcastingAbility } from 'entities/Class'
import { PrismaClass } from 'infra/prisma/data/Class'
import { adaptPrismaSubclass } from '../adaptPrismaSubclass'

export const spellcastingAbilityMap = {
  INT: 'intelligence',
  WIS: 'wisdom',
  CHA: 'charisma',
}

export const adaptPrismaClass = (prismaClass: PrismaClass): Class => {
  return {
    id: prismaClass.id.toString(),
    name: prismaClass.name,
    spellcastingAbility: adaptSpellcastingAbility(
      prismaClass.spellcastingAbility,
    ),
    subclasses: prismaClass.subclasses?.map((subclass) =>
      adaptPrismaSubclass(subclass),
    ),
    skills: prismaClass.classesSkills?.map((classSkill) => ({
      id: classSkill.skill.id.toString(),
      name: classSkill.skill.name,
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
