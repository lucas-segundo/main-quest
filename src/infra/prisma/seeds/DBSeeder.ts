import { mockPrismaSubclass } from '../data/Subclass/mock'
import { mockPrismaClass } from '../data/Class/mock'
import prisma from '..'
import { mockPrismaSkill } from '../data/Skill/mock'

export class DBSeeder {
  async seed() {
    const classCreated = await this.seedClass()
    const subclassCreated = await this.seedSubclass(classCreated.id)
    const skillCreated = await this.seedSkill()

    return {
      classCreated,
      subclassCreated,
      skillCreated,
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
    const subclassToCreate = mockPrismaSubclass()
    const subclassCreated = await prisma.subclass.create({
      data: { ...subclassToCreate, classID },
    })

    return subclassCreated
  }

  private async seedSkill() {
    const skillToCreate = mockPrismaSkill()

    const skillCreated = await prisma.skill.create({
      data: skillToCreate,
    })

    return skillCreated
  }
}
