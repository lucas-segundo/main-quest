import { Class } from '../..'

interface Include {
  skills?: boolean
}

export interface AddClassSkillRepositoryParams {
  include?: Include
}

export interface AddClassSkillRepository {
  add(
    classID: string,
    skillIDs: string[],
    params?: AddClassSkillRepositoryParams,
  ): Promise<Class>
}
