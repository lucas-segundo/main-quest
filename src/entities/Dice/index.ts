export class Dice {
  static roll(dice: string): number {
    const [count, sides] = dice.split('d').map(Number)
    let total = 0
    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * sides) + 1
    }
    return total
  }
}
