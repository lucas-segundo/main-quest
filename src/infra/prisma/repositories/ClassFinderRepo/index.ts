import {
  ClassFinderRepo,
  ClassFinderRepoParams,
} from 'app/interfaces/classes/ClassFinderRepo'
import { Class } from 'domain/entities/Class'
import { NotFoundError } from 'domain/errors/NotFoundError'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'

export class PrismaClassFinderRepo implements ClassFinderRepo {
  async find(params: ClassFinderRepoParams): Promise<Class> {
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
