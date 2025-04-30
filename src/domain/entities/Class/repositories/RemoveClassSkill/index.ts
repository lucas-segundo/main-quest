import { Class } from '../..'

interface Include {
  skills?: boolean
}

export interface RemoveClassSkillRepositoryParams {
  include?: Include
}

export interface RemoveClassSkillRepository {
  remove(
    classID: string,
    skillIDs: string[],
    params?: RemoveClassSkillRepositoryParams,
  ): Promise<Class>
}
