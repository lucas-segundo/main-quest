import { Subclass } from '../..'

export interface AddSubclassSpellRepository {
  add(subclassID: string, spellIDs: string[]): Promise<Subclass>
}
