import { Dice } from './index'

describe('Dice', () => {
  it('should return a number within the correct range for valid dice strings', () => {
    const result = Dice.rollAll('1d6')
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(6)
  })

  it('should handle multiple dice correctly', () => {
    const result = Dice.rollAll('2d6')
    expect(result).toBeGreaterThanOrEqual(2)
    expect(result).toBeLessThanOrEqual(12)
  })

  it('should get max value for dice', () => {
    const result = Dice.getMaxValue('1d6')
    expect(result).toBe(6)
  })
})
