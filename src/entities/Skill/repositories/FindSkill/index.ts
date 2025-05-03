import { Skill } from 'entities/Skill'

interface Filter {
  id: {
    equals: string
  }
}

export interface FindSkillRepositoryParams {
  filter: Filter
}

export interface FindSkillRepository {
  find(params: FindSkillRepositoryParams): Promise<Skill>
}
