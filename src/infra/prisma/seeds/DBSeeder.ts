import { mockPrismaSubclass } from '../data/Subclass/mock'
import { mockPrismaClass } from '../data/Class/mock'
import prisma from '..'

export class DBSeeder {
  async seed() {
    const classCreated = await this.seedClass()
    const subclassCreated = await this.seedSubclass(classCreated.id)

    return {
      classCreated,
      subclassCreated,
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
}
