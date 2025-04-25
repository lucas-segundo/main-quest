import { Skill } from 'domain/entities/Skill'

export interface CreateSkillRepositoryParams {
  name: string
}

export interface CreateSkillRepository {
  create(params: CreateSkillRepositoryParams): Promise<Skill>
}
