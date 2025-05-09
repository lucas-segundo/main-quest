import { Subclass } from 'entities/Subclass'
import { NotFoundError } from 'app/errors/NotFoundError'
import prisma from 'infra/prisma'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'
import { FindSubclassRepository, FindSubclassRepositoryParams } from '..'

export class PrismaFindSubclass implements FindSubclassRepository {
  async find(params: FindSubclassRepositoryParams): Promise<Subclass> {
    const { filter } = params
    const prismaSubclass = await prisma.subclass.findFirst({
      where: {
        id: Number(filter.id.equals),
      },
    })

    if (prismaSubclass) {
      return adaptPrismaSubclass(prismaSubclass)
    } else {
      throw new NotFoundError('Subclass')
    }
  }
}
