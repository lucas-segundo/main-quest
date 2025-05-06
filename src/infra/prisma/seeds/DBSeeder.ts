import { mockPrismaSubclass } from '../data/Subclass/mock'
import { mockPrismaClass } from '../data/Class/mock'
import prisma from '..'
import { mockPrismaSpell } from '../data/Spell/mock'
import { mockPrismaCharacter } from '../data/Character/mock'

export class DBSeeder {
  async seed() {
    const classCreated = await this.seedClass()
    const subclassCreated = await this.seedSubclass(classCreated.id)
    const spellCreated = await this.seedSpell()
    const characterCreated = await this.seedCharacter(classCreated.id)

    return {
      classCreated,
      subclassCreated,
      spellCreated,
      characterCreated,
    }
  }

  private async seedClass() {
    const classToCreate = mockPrismaClass()
    const classCreated = await prisma.class.create({
      data: {
        name: classToCreate.name,
      },
    })

    return classCreated
  }

  private async seedSubclass(classID: number) {
    const { name } = mockPrismaSubclass()
    const subclassCreated = await prisma.subclass.create({
      data: { name, classID },
    })

    return subclassCreated
  }

  private async seedSpell() {
    const { name } = mockPrismaSpell()

    const spellCreated = await prisma.spell.create({
      data: {
        name,
      },
    })

    return spellCreated
  }

  private async seedCharacter(classID: number) {
    const character = mockPrismaCharacter()
    const characterCreated = await prisma.character.create({
      data: {
        name: character.name,
        level: character.level,
        classID,
        strength: character.strength,
        dexterity: character.dexterity,
        constitution: character.constitution,
        intelligence: character.intelligence,
        wisdom: character.wisdom,
        charisma: character.charisma,
      },
    })

    return characterCreated
  }
}
