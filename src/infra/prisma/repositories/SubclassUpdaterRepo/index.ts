import {
  SubclassUpdaterRepo,
  SubclassUpdaterRepoParams,
} from 'app/interfaces/SubclassUpdaterRepo'
import { Subclass } from 'domain/entities/Subclass'
import prisma from 'infra/prisma'
import { adaptPrismaSubclass } from 'infra/prisma/adapters/adaptPrismaSubclass'

export class PrismaSubclassUpdaterRepo implements SubclassUpdaterRepo {
  async update(
    id: string,
    params: SubclassUpdaterRepoParams,
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
