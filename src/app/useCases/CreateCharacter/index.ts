import { UniqueError } from 'app/errors/UniqueErro'
import { Character } from 'domain/entities/Character'
import { CreateCharacterService } from 'domain/entities/Character/services/CreateCharacter'
import { FindCharacterService } from 'domain/entities/Character/services/FindCharacter'
import { CalculateHPUseCase } from '../CalculateHP'
import { FindClassService } from 'domain/entities/Class/services/FindClass'

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
  | 'learnedSpells'
>

export class CreateCharacterUseCase {
  constructor(
    private readonly createCharacterService: CreateCharacterService,
    private readonly findCharacterService: FindCharacterService,
    private readonly findClassService: FindClassService,
    private readonly calculateHPUseCase: CalculateHPUseCase,
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

    const hp = this.calculateHPUseCase.execute({
      constitution: dto.constitution,
      level: dto.level,
      classHitDice: classData.hitDice,
    })

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
      learnedSpells: dto.learnedSpells,
    })
  }
}
