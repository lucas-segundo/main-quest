import {
  ClassUpdaterRepo,
  ClassUpdaterRepoParams,
} from 'app/interfaces/classes/ClassUpdaterRepo'
import { Class } from 'domain/entities/Class'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'

export class PrismaClassUpdaterRepo implements ClassUpdaterRepo {
  async update(id: string, params: ClassUpdaterRepoParams): Promise<Class> {
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
