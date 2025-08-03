import { Class } from 'domain/entities/Class'
import { NotFoundError } from 'app/errors/NotFoundError'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/data/Class/adapter'
import { FindClassService, FindClassServiceParams } from '..'

export class PrismaFindClassService implements FindClassService {
  async find(params: FindClassServiceParams): Promise<Class> {
    const { filter, include } = params
    const prismaClass = await prisma.class.findFirst({
      where: {
        id: Number(filter.id.eq),
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
