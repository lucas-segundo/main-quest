import { Class } from 'domain/entities/Class'
import { NotFoundError } from 'domain/errors/NotFoundError'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { FindClassRepository, FindClassRepositoryParams } from '..'

export class PrismaFindClassRepository implements FindClassRepository {
  async find(params: FindClassRepositoryParams): Promise<Class> {
    const { filter, include } = params
    const prismaClass = await prisma.class.findFirst({
      where: {
        id: Number(filter.id.equals),
      },
      include: {
        subclasses: include?.subclasses,
      },
    })

    if (prismaClass) {
      return adaptPrismaClass(prismaClass)
    } else {
      throw new NotFoundError('Class')
    }
  }
}
