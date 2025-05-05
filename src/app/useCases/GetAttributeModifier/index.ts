export class GetAttributeModifierUseCase {
  get(value: number): number {
    if (value <= 1) {
      return -5
    }

    if (value >= 20) {
      return 5
    }

    return Math.floor((value - 10) / 2)
  }
}
