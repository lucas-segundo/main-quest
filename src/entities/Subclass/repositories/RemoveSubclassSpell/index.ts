import { Subclass } from '../..'

export interface RemoveSubclassSpellRepository {
  remove(subclassID: string, spellIDs: string[]): Promise<Subclass>
}
