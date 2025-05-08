import { Subclass } from 'entities/Subclass'
import prisma from 'infra/prisma'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'
import { CreateSubclassRepository, CreateSubclassRepositoryParams } from '..'

export class PrismaCreateSubclassRepository
  implements CreateSubclassRepository
{
  async create(params: CreateSubclassRepositoryParams): Promise<Subclass> {
    const prismaSubclass = await prisma.subclass.create({
      data: {
        classID: Number(params.classID),
        name: params.name,
      },
    })

    return adaptPrismaSubclass(prismaSubclass)
  }
}
