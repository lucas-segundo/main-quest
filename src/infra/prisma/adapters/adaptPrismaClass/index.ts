import { Class } from 'entities/Class'
import { PrismaClass } from 'infra/prisma/data/Class'
import { adaptPrismaSubclass } from '../adaptPrismaSubclass'

export const adaptPrismaClass = (prismaClass: PrismaClass): Class => {
  return {
    id: prismaClass.id.toString(),
    name: prismaClass.name,
    subclasses: prismaClass.subclasses?.map((subclass) =>
      adaptPrismaSubclass(subclass),
    ),
    spells: prismaClass.classesSpells?.map((classSpell) => ({
      id: classSpell.spell.id.toString(),
      name: classSpell.spell.name,
    })),
  }
}
