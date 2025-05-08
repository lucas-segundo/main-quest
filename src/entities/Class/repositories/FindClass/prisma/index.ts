import { Class } from 'entities/Class'
import { NotFoundError } from 'app/errors/NotFoundError'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/data/Class/adapter'
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
        classesSpells: {
          include: {
            spell: include?.spells,
          },
        },
      },
    })

    if (prismaClass) {
      return adaptPrismaClass(prismaClass)
    } else {
      throw new NotFoundError('Class')
    }
  }
}
