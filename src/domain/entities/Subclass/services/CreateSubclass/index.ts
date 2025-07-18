import { Subclass } from 'domain/entities/Subclass'

export interface CreateSubclassServiceParams {
  name: string
  classID: string
}

export interface CreateSubclassService {
  create(params: CreateSubclassServiceParams): Promise<Subclass>
}
