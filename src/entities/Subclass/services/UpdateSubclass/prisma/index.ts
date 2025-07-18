import { Subclass } from 'entities/Subclass'
import prisma from 'infra/prisma'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'
import { UpdateSubclassService, UpdateSubclassServiceParams } from '..'

export class PrismaUpdateSubclassService implements UpdateSubclassService {
  async update(
    id: string,
    params: UpdateSubclassServiceParams,
  ): Promise<Subclass> {
    const { data } = params
    const prismaSubclass = await prisma.subclass.update({
      data: {
        name: data.name,
      },
      where: {
        id: Number(id),
      },
    })

    return adaptPrismaSubclass(prismaSubclass)
  }
}
