import { getAbilityModifier } from '.'

describe('GetAbilityModifierUseCase', () => {
  it('should return -5 when the value is less than or equal to 1', () => {
    expect(getAbilityModifier(1)).toBe(-5)
    expect(getAbilityModifier(0)).toBe(-5)
    expect(getAbilityModifier(-10)).toBe(-5)
  })

  it('should return 5 when the value is greater than or equal to 20', () => {
    expect(getAbilityModifier(20)).toBe(5)
    expect(getAbilityModifier(25)).toBe(5)
    expect(getAbilityModifier(100)).toBe(5)
  })

  it('should calculate the correct modifier for values between 2 and 19', () => {
    expect(getAbilityModifier(2)).toBe(-4)
    expect(getAbilityModifier(10)).toBe(0)
    expect(getAbilityModifier(15)).toBe(2)
    expect(getAbilityModifier(19)).toBe(4)
  })
})
