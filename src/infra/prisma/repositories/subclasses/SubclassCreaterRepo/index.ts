import {
  SubclassCreaterRepo,
  SubclassCreaterRepoParams,
} from 'app/interfaces/subclasses/SubclassCreaterRepo'
import { Subclass } from 'domain/entities/Subclass'
import prisma from 'infra/prisma'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'

export class PrismaSubclassCreaterRepo implements SubclassCreaterRepo {
  async create(params: SubclassCreaterRepoParams): Promise<Subclass> {
    const prismaSubclass = await prisma.subclass.create({
      data: {
        classID: Number(params.classID),
        name: params.name,
      },
    })

    return adaptPrismaSubclass(prismaSubclass)
  }
}
