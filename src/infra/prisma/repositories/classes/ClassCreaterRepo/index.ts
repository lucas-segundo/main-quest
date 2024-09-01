import {
  ClassCreaterRepo,
  ClassCreaterRepoParams,
} from 'app/interfaces/classes/ClassCreaterRepo'
import { Class } from 'domain/entities/Class'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'

export class PrismaClassCreaterRepo implements ClassCreaterRepo {
  async create(params: ClassCreaterRepoParams): Promise<Class> {
    const prismaClass = await prisma.class.create({
      data: {
        name: params.name,
      },
      include: {
        subclasses: true,
      },
    })

    return adaptPrismaClass(prismaClass)
  }
}
