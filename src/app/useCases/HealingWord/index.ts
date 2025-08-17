import { FindCharacterService } from 'domain/entities/Character/services/FindCharacter'
import { UpdateCharacterService } from 'domain/entities/Character/services/UpdateCharacter'
import { SpellcastingAbility } from 'domain/entities/Class'
import { Dice } from 'domain/entities/Dice'
import { getAbilityModifier } from 'domain/utils/getAbilityModifier'

export interface HealingWordDTO {
  characterID: string
  targetID: string
  spellCastingAbility: SpellcastingAbility
}

export interface HealingWordUseCaseResult {
  amountHealed: number
}

export class HealingWordUseCase {
  constructor(
    private readonly findCharacterService: FindCharacterService,
    private readonly updateCharacterService: UpdateCharacterService,
  ) {}

  async execute(dto: HealingWordDTO): Promise<HealingWordUseCaseResult> {
    const character = await this.findCharacterService.find({
      filter: {
        id: {
          eq: dto.characterID,
        },
      },
    })

    if (!character) {
      throw new Error('Character not found')
    }

    const target = await this.findCharacterService.find({
      filter: {
        id: {
          eq: dto.targetID,
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

    const modifier = getAbilityModifier(character[dto.spellCastingAbility])
    const amountHealed = modifier + Dice.rollAll('1d4')

    await this.updateCharacterService.update(target.id, {
      data: {
        hitPoints: Math.min(
          target.hitPoints + amountHealed,
          target.maxHitPoints,
        ),
      },
    })

    return {
      amountHealed,
    }
  }
}
