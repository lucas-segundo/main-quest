import { Subclass } from '../..'

export interface RemoveSubclassSkillRepository {
  remove(classID: string, skillIDs: string[]): Promise<Subclass>
}
