import { Skill } from 'entities/Skill'

interface Data {
  name?: string
}

export interface UpdateSkillRepositoryParams {
  data: Data
}

export interface UpdateSkillRepository {
  update(id: string, params: UpdateSkillRepositoryParams): Promise<Skill>
}
