import { mockPrismaSubclass } from '../data/Subclass/mock'
import { mockPrismaClass } from '../data/Class/mock'
import { PrismaClass } from '../data/Class'
import { PrismaSubclass } from '../data/Subclass'
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
    const classToCreate = mockPrismaClass() as OptionalProp<PrismaClass, 'id'>
    delete classToCreate.id
    const classCreated = await prisma.class.create({
      data: classToCreate,
    })

    return classCreated
  }

  private async seedSubclass(classID: number) {
    const subclassToCreate = mockPrismaSubclass() as OptionalProp<
      PrismaSubclass,
      'id'
    >
    delete subclassToCreate.id
    const subclassCreated = await prisma.subclass.create({
      data: { ...subclassToCreate, classID },
    })

    return subclassCreated
  }
}
