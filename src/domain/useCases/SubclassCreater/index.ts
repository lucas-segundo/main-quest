import { Subclass } from 'domain/entities/Subclass'

export interface SubclassCreaterParams {
  name: string
}

export interface SubclassCreater {
  create: (params: SubclassCreaterParams) => Promise<Subclass>
}
