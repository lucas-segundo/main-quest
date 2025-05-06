import { Spell } from '../Spell'
import { Subclass } from '../Subclass'

export interface Class {
  id: string
  name: string
  subclasses?: Subclass[]
  spells?: Spell[]
}
