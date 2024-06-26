import { faker } from '@faker-js/faker'
import { Subclass } from 'domain/entities/Subclass'

export interface SubclassCreaterParams {
  name: string
}

export class SubclassCreater {
  async create(params: SubclassCreaterParams): Promise<Subclass> {
    return {
      id: faker.string.uuid(),
      name: params.name,
    }
  }
}
