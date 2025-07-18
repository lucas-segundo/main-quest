import { Class } from '../..'

export interface RemoveClassSpellService {
  remove(classID: string, spellIDs: string[]): Promise<Class>
}
