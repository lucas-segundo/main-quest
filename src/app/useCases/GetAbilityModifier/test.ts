import { GetAbilityModifierUseCase } from '.'

describe('GetAbilityModifierUseCase', () => {
  let useCase: GetAbilityModifierUseCase

  beforeEach(() => {
    useCase = new GetAbilityModifierUseCase()
  })

  it('should return -5 when the value is less than or equal to 1', () => {
    expect(useCase.get(1)).toBe(-5)
    expect(useCase.get(0)).toBe(-5)
    expect(useCase.get(-10)).toBe(-5)
  })

  it('should return 5 when the value is greater than or equal to 20', () => {
    expect(useCase.get(20)).toBe(5)
    expect(useCase.get(25)).toBe(5)
    expect(useCase.get(100)).toBe(5)
  })

  it('should calculate the correct modifier for values between 2 and 19', () => {
    expect(useCase.get(2)).toBe(-4)
    expect(useCase.get(10)).toBe(0)
    expect(useCase.get(15)).toBe(2)
    expect(useCase.get(19)).toBe(4)
  })
})
