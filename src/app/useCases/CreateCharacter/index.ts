import { UniqueError } from 'app/errors/UniqueErro'
import { Character } from 'entities/Character'
import { CreateCharacterRepository } from 'entities/Character/repositories/CreateCharacter'
import { FindCharacterRepository } from 'entities/Character/repositories/FindCharacter'
import { CalculateHPUseCase } from '../CalculateHP'
import { FindClassRepository } from 'entities/Class/repositories/FindClass'

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
    private readonly createCharacterRepository: CreateCharacterRepository,
    private readonly findCharacterRepository: FindCharacterRepository,
    private readonly findClassRepository: FindClassRepository,
    private readonly calculateHPUseCase: CalculateHPUseCase,
  ) {}

  async execute(dto: DTO): Promise<Character> {
    const character = await this.findCharacterRepository.find({
      filter: {
        name: {
          like: dto.name,
        },
      },
    })

    if (character) {
      throw new UniqueError('Character')
    }

    const classData = await this.findClassRepository.find({
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

    return await this.createCharacterRepository.create({
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
