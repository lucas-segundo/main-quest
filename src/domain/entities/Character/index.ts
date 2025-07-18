import { LearnedSpell } from 'domain/entities/LearnedSpell'

export interface Character {
  id: string
  name: string
  level: number
  hitPoints: number
  maxHitPoints: number
  classID: string
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number

  learnedSpells?: LearnedSpell[]
}
