import { Subclass } from 'domain/entities/Subclass'

export interface SubclassCreaterRepoParams {
  name: string
}

export interface SubclassCreaterRepo {
  create(params: SubclassCreaterRepoParams): Promise<Subclass>
}
