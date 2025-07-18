import { Class } from 'domain/entities/Class'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/data/Class/adapter'
import { FindClassesService, FindClassesServiceParams } from '..'

export class PrismaFindClassesService implements FindClassesService {
  async find(params: FindClassesServiceParams): Promise<Class[]> {
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
