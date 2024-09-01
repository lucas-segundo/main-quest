import { Subclass } from 'domain/entities/Subclass'

interface Data {
  name?: string
}

export interface SubclassUpdaterRepoParams {
  data: Data
}

export interface SubclassUpdaterRepo {
  update(id: string, params: SubclassUpdaterRepoParams): Promise<Subclass>
}
