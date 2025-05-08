import { Subclass } from 'entities/Subclass'
import prisma from 'infra/prisma'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'
import { UpdateSubclassRepository, UpdateSubclassRepositoryParams } from '..'

export class PrismaUpdateSubclassRepository
  implements UpdateSubclassRepository
{
  async update(
    id: string,
    params: UpdateSubclassRepositoryParams,
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
