import { Subclass } from 'domain/entities/Subclass'

export interface CreateSubclassRepositoryParams {
  name: string
  classID: string
}

export interface CreateSubclassRepository {
  create(params: CreateSubclassRepositoryParams): Promise<Subclass>
}
