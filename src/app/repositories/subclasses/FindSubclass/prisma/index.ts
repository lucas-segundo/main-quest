import { Subclass } from 'domain/entities/Subclass'
import { NotFoundError } from 'domain/errors/NotFoundError'
import prisma from 'infra/prisma'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'
import { FindSubclasses, FindSubclassesParams } from '..'

export class PrismaFindSubclasses implements FindSubclasses {
  async find(params: FindSubclassesParams): Promise<Subclass> {
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
