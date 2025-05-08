import { Class } from 'entities/Class'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/data/Class/adapter'
import { FindClassesRepository, FindClassesRepositoryParams } from '..'

export class PrismaFindClassesRepository implements FindClassesRepository {
  async find(params: FindClassesRepositoryParams): Promise<Class[]> {
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
