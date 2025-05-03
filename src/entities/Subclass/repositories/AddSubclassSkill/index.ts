import { Subclass } from '../..'

export interface AddSubclassSkillRepository {
  add(subclassID: string, skillIDs: string[]): Promise<Subclass>
}
