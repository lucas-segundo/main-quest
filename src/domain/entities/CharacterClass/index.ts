import { Subclass } from '../Subclass'

export interface CharacterClass {
  id: string
  name: string
  subclasses: Subclass[]
}
