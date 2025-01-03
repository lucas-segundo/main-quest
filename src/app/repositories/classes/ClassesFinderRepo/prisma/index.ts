import {
  ClassesFinderRepo,
  ClassesFinderRepoParams,
} from 'app/repositories/classes/ClassesFinderRepo'
import { Class } from 'domain/entities/Class'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'

export class PrismaClassesFinderRepo implements ClassesFinderRepo {
  async find(params: ClassesFinderRepoParams): Promise<Class[]> {
    const { filter, include } = params
    const prismaClasses = await prisma.class.findMany({
      where: {
        name: {
          contains: filter.name?.like,
        },
      },
      include: {
        subclasses: include?.subclasses,
      },
    })

    return prismaClasses.map((prismaClass) => adaptPrismaClass(prismaClass))
  }
}
