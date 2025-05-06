import { Class } from '../..'

export interface AddClassSpellRepository {
  add(classID: string, spellIDs: string[]): Promise<Class>
}
