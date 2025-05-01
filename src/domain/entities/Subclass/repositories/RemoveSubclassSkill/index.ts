import { Subclass } from '../..'

interface Include {
  skills?: boolean
}

export interface RemoveSubclassSkillRepositoryParams {
  include?: Include
}

export interface RemoveSubclassSkillRepository {
  remove(
    classID: string,
    skillIDs: string[],
    params?: RemoveSubclassSkillRepositoryParams,
  ): Promise<Subclass>
}
