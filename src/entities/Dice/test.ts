import { Dice } from './index'

describe('Dice', () => {
  it('should return a number within the correct range for valid dice strings', () => {
    const result = Dice.roll('1d6')
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(6)
  })

  it('should handle multiple dice correctly', () => {
    const result = Dice.roll('2d6')
    expect(result).toBeGreaterThanOrEqual(2)
    expect(result).toBeLessThanOrEqual(12)
  })
})
