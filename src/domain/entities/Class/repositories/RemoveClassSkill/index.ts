import { Class } from '../..'

export interface RemoveClassSkillRepository {
  remove(classID: string, skillIDs: string[]): Promise<Class>
}
