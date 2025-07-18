import { Subclass } from 'domain/entities/Subclass'
import prisma from 'infra/prisma'
import { adaptPrismaSubclass } from 'infra/prisma/data/Subclass/adapter'
import { CreateSubclassService, CreateSubclassServiceParams } from '..'

export class PrismaCreateSubclassService implements CreateSubclassService {
  async create(params: CreateSubclassServiceParams): Promise<Subclass> {
    const prismaSubclass = await prisma.subclass.create({
      data: {
        classID: Number(params.classID),
        name: params.name,
      },
    })

    return adaptPrismaSubclass(prismaSubclass)
  }
}
