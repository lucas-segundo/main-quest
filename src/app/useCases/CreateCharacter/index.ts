import { KnownError } from 'app/errors/KnownError'
import { UniqueError } from 'app/errors/UniqueError'
import { Character } from 'domain/entities/Character'
import { CreateCharacterService } from 'domain/entities/Character/services/CreateCharacter'
import { FindCharacterService } from 'domain/entities/Character/services/FindCharacter'
import { FindClassService } from 'domain/entities/Class/services/FindClass'
import { calculateHP } from 'domain/metrics/calculateHP'

type DTO = Pick<
  Character,
  | 'name'
  | 'level'
  | 'classID'
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma'
  | 'spells'
>

export class CreateCharacterUseCase {
  constructor(
    private readonly createCharacterService: CreateCharacterService,
    private readonly findCharacterService: FindCharacterService,
    private readonly findClassService: FindClassService,
  ) {}

  async execute(dto: DTO): Promise<Character> {
    this.validateLevel(dto)
    this.validateAttributes(dto)

    await this.validateIsCharacterUnique(dto)

    const classData = await this.findClassService.find({
      filter: {
        id: {
          eq: dto.classID,
        },
      },
    })

    let hp = 0
    for (let i = 0; i < dto.level; i++) {
      hp += calculateHP({
        constitution: dto.constitution,
        level: i,
        classHitDice: classData.hitDice,
      })
    }

    return await this.createCharacterService.create({
      name: dto.name,
      level: dto.level,
      classID: dto.classID,
      hitPoints: hp,
      maxHitPoints: hp,
      strength: dto.strength,
      dexterity: dto.dexterity,
      constitution: dto.constitution,
      intelligence: dto.intelligence,
      wisdom: dto.wisdom,
      charisma: dto.charisma,
      spells: dto.spells,
    })
  }

  private validateLevel(dto: DTO): void {
    if (dto.level < 1 || dto.level > 20) {
      throw new KnownError(
        'CHARACTER_LEVEL_INVALID',
        'Character Level must be between 1 and 20',
      )
    }
  }

  private validateAttributes(dto: DTO): void {
    const attributes = [
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charisma',
    ]

    for (const attribute of attributes) {
      if (dto[attribute] < 1 || dto[attribute] > 20) {
        throw new KnownError(
          `CHARACTER_${attribute.toUpperCase()}_INVALID`,
          `${attribute.charAt(0).toUpperCase() + attribute.slice(1)} must be between 1 and 20`,
        )
      }
    }
  }

  private async validateIsCharacterUnique(dto: DTO) {
    const character = await this.findCharacterService.find({
      filter: {
        name: {
          lk: dto.name,
        },
      },
    })

    if (character) {
      throw new UniqueError('Character')
    }
  }
}
