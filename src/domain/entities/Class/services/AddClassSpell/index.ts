import { Class } from '../..'

export interface AddClassSpellService {
  add(classID: string, spellIDs: string[]): Promise<Class>
}
