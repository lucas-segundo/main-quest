import { Class } from 'domain/entities/Class'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { UpdateClassRepository, UpdateClassRepositoryParams } from '..'

export class PrismaUpdateClassRepository implements UpdateClassRepository {
  async update(
    id: string,
    params: UpdateClassRepositoryParams,
  ): Promise<Class> {
    const { data, include } = params
    const prismaClass = await prisma.class.update({
      data: {
        name: data.name,
      },
      where: {
        id: Number(id),
      },
      include: {
        subclasses: include?.subclasses,
      },
    })

    return adaptPrismaClass(prismaClass)
  }
}
