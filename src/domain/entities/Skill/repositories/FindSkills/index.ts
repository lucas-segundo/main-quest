import { Skill } from 'domain/entities/Skill'

interface Filter {
  name?: {
    like?: string
  }
  classID?: {
    equals?: string
  }
  subclassID?: {
    equals?: string
  }
}

export interface FindSkillsRepositoryParams {
  filter: Filter
}

export interface FindSkillsRepository {
  find(params: FindSkillsRepositoryParams): Promise<Skill[]>
}
