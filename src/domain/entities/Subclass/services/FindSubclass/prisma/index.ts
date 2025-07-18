import { Subclass } from 'domain/entities/Subclass'
import { NotFoundError } from 'app/errors/NotFoundError'
import prisma from 'infra/prisma'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'
import { FindSubclassService, FindSubclassServiceParams } from '..'

export class PrismaFindSubclass implements FindSubclassService {
  async find(params: FindSubclassServiceParams): Promise<Subclass> {
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
