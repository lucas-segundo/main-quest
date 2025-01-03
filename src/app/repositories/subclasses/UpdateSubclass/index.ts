import { Subclass } from 'domain/entities/Subclass'

interface Data {
  name?: string
}

export interface UpdateSubclassRepositoryParams {
  data: Data
}

export interface UpdateSubclassRepository {
  update(id: string, params: UpdateSubclassRepositoryParams): Promise<Subclass>
}
