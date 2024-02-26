import { Subclass } from 'domain/entities/Subclass'
import { SubclassCreaterParams } from 'domain/useCases/SubclassCreater'

export interface SubclassCreaterRepoParams extends SubclassCreaterParams {}

export interface SubclassCreaterRepo {
  create(params: SubclassCreaterRepoParams): Promise<Subclass>
}
