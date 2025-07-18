import { Subclass } from '../..'

export interface RemoveSubclassSpellService {
  remove(subclassID: string, spellIDs: string[]): Promise<Subclass>
}
