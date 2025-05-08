import {
  adaptSpellcastingAbility,
  adaptToPrismaSpellcastingAbility,
} from './adapter'

describe('adaptSpellcastingAbility', () => {
  it('should correctly map "CHA" to "charisma"', () => {
    const result = adaptSpellcastingAbility('CHA')
    expect(result).toBe('charisma')
  })

  it('should correctly map "WIS" to "wisdom"', () => {
    const result = adaptSpellcastingAbility('WIS')
    expect(result).toBe('wisdom')
  })

  it('should correctly map "INT" to "intelligence"', () => {
    const result = adaptSpellcastingAbility('INT')
    expect(result).toBe('intelligence')
  })
})

describe('adaptToPrismaSpellcastingAbility', () => {
  it('should correctly map "charisma" to "CHA"', () => {
    const result = adaptToPrismaSpellcastingAbility('charisma')
    expect(result).toBe('CHA')
  })

  it('should correctly map "wisdom" to "WIS"', () => {
    const result = adaptToPrismaSpellcastingAbility('wisdom')
    expect(result).toBe('WIS')
  })

  it('should correctly map "intelligence" to "INT"', () => {
    const result = adaptToPrismaSpellcastingAbility('intelligence')
    expect(result).toBe('INT')
  })
})
