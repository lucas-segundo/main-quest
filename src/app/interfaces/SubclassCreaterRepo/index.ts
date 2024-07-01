import { Subclass } from 'domain/entities/Subclass'

export interface SubclassCreaterRepoParams {
  name: string
  classID: string
}

export interface SubclassCreaterRepo {
  create(params: SubclassCreaterRepoParams): Promise<Subclass>
}
