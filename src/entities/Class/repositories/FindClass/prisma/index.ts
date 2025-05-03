import { Class } from 'entities/Class'
import { NotFoundError } from 'app/errors/NotFoundError'
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
        classesSkills: {
          include: {
            skill: include?.skills,
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
