import { Class } from 'entities/Class'

interface Data {
  name?: string
}

interface Include {
  subclasses?: boolean
}

export interface UpdateClassServiceParams {
  data: Data
  include?: Include
}

export interface UpdateClassService {
  update(id: string, params: UpdateClassServiceParams): Promise<Class>
}
