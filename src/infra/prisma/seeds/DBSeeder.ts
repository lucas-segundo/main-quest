import { mockPrismaSubclass } from '../data/Subclass/mock'
import { mockPrismaClass } from '../data/Class/mock'
import prisma from '..'
import { mockPrismaSkill } from '../data/Skill/mock'
import { mockPrismaCharacter } from '../data/Character/mock'

export class DBSeeder {
  async seed() {
    const classCreated = await this.seedClass()
    const subclassCreated = await this.seedSubclass(classCreated.id)
    const skillCreated = await this.seedSkill()
    const characterCreated = await this.seedCharacter(classCreated.id)

    return {
      classCreated,
      subclassCreated,
      skillCreated,
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

  private async seedSkill() {
    const { name } = mockPrismaSkill()

    const skillCreated = await prisma.skill.create({
      data: {
        name,
      },
    })

    return skillCreated
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
