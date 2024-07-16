import {
  ClassFinderRepo,
  ClassFinderRepoParams,
} from 'app/interfaces/ClassFinderRepo'
import { Class } from 'domain/entities/Class'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'

export class PrismaClassFinderRepo implements ClassFinderRepo {
  async find(params: ClassFinderRepoParams): Promise<Class> {
    const prismaClass = await prisma.class.findFirst({
      where: {
        id: Number(params.id.equals),
      },
    })

    if (prismaClass) {
      return adaptPrismaClass(prismaClass)
    } else {
      throw new Error('Class not found')
    }
  }
}
