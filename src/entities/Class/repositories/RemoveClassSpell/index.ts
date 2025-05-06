import { Class } from '../..'

export interface RemoveClassSpellRepository {
  remove(classID: string, spellIDs: string[]): Promise<Class>
}
