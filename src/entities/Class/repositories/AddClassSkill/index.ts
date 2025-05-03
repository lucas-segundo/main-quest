import { Class } from '../..'

export interface AddClassSkillRepository {
  add(classID: string, skillIDs: string[]): Promise<Class>
}
