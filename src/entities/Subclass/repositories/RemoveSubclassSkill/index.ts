import { Subclass } from '../../../Subclass'

export interface RemoveSubclassSkillRepository {
  remove(subclassID: string, skillIDs: string[]): Promise<Subclass>
}
