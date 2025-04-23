import { Class } from 'domain/entities/Class'
import prisma from 'infra/prisma'
import { adaptPrismaClass } from 'infra/prisma/adapters/adaptPrismaClass'
import { CreateClassRepository, CreateClassRepositoryParams } from '..'

export class PrismaCreateClassRepository implements CreateClassRepository {
  async create(params: CreateClassRepositoryParams): Promise<Class> {
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
