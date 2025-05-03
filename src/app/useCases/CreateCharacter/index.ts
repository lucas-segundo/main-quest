import { UniqueError } from 'app/errors/UniqueErro'
import { Character } from 'entities/Character'
import {
  CreateCharacterRepository,
  CreateCharacterRepositoryParams,
} from 'entities/Character/repositories/CreateCharacter'
import { FindCharacterRepository } from 'entities/Character/repositories/FindCharacter'

interface DTO {
  character: CreateCharacterRepositoryParams
}

export class CreateCharacterUseCase {
  constructor(
    private readonly createCharacterRepository: CreateCharacterRepository,
    private readonly findCharacterRepository: FindCharacterRepository,
  ) {}

  async execute(dto: DTO): Promise<Character> {
    const character = await this.findCharacterRepository.find({
      filter: {
        name: {
          like: dto.character.name,
        },
      },
    })

    if (character) {
      throw new UniqueError('Character')
    }

    return await this.createCharacterRepository.create(dto.character)
  }
}
