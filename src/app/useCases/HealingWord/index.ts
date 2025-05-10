import { FindCharacterRepository } from 'entities/Character/repositories/FindCharacter'
import { SpellcastingAbility } from 'entities/Class'
import { GetAbilityModifierUseCase } from '../GetAbilityModifier'
import { Dice } from 'entities/Dice'

interface DTO {
  characterID: string
  targetID: string
  spellCastingAbility: SpellcastingAbility
}

interface Result {
  amountHealed: number
}

export class HealingWordUseCase {
  constructor(
    private readonly findCharacterRepository: FindCharacterRepository,
    private readonly getAbilityModifierUseCase: GetAbilityModifierUseCase,
  ) {}

  async execute(dto: DTO): Promise<Result> {
    const character = await this.findCharacterRepository.find({
      filter: {
        id: {
          equals: dto.characterID,
        },
      },
    })

    if (!character) {
      throw new Error('Character not found')
    }

    const target = await this.findCharacterRepository.find({
      filter: {
        id: {
          equals: dto.targetID,
        },
      },
    })

    if (!target) {
      throw new Error('Target not found')
    }

    if (target.hitPoints === target.maxHitPoints) {
      return {
        amountHealed: 0,
      }
    }

    const modifier = this.getAbilityModifierUseCase.get(
      character[dto.spellCastingAbility],
    )
    const amountHealed = modifier + Dice.rollAll('1d4')

    return {
      amountHealed,
    }
  }
}
