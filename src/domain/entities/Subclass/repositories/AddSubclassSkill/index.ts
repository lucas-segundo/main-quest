import { Subclass } from '../..'

export interface AddSubclassSkillRepository {
  add(classID: string, skillIDs: string[]): Promise<Subclass>
}
