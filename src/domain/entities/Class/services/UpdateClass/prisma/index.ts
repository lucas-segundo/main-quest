import { Class } from 'domain/entities/Class'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/data/Class/adapter'
import { UpdateClassService, UpdateClassServiceParams } from '..'

export class PrismaUpdateClassService implements UpdateClassService {
  async update(id: string, params: UpdateClassServiceParams): Promise<Class> {
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
