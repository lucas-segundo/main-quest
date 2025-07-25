import { UniqueError } from 'app/errors/UniqueErro'
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
    const character = await this.findCharacterService.find({
      filter: {
        name: {
          like: dto.name,
        },
      },
    })

    if (character) {
      throw new UniqueError('Character')
    }

    const classData = await this.findClassService.find({
      filter: {
        id: {
          equals: dto.classID,
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
}
