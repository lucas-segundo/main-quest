import { Subclass } from 'entities/Subclass'

interface Data {
  name?: string
}

export interface UpdateSubclassServiceParams {
  data: Data
}

export interface UpdateSubclassService {
  update(id: string, params: UpdateSubclassServiceParams): Promise<Subclass>
}
