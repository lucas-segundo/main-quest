import { Subclass } from '../..'

export interface AddSubclassSpellService {
  add(subclassID: string, spellIDs: string[]): Promise<Subclass>
}
