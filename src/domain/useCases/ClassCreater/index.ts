import { Class } from 'domain/entities/Class'

export interface ClassCreaterParams {
  name: string
}

export interface ClassCreater {
  create: (params: ClassCreaterParams) => Promise<Class>
}
