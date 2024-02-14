import { mockCharacterClass } from 'domain/entities/CharacterClass/mock'
import {
  CharacterClassCreater,
  CharacterClassCreaterParams,
} from 'domain/useCases/CharacterClassCreater'
import { Controller, HTTPResponse } from 'presentation/interfaces/Controller'

export interface CharacterClassCreaterControllerParams {
  data: CharacterClassCreaterParams
}

export class CharacterClassCreaterController implements Controller {
  constructor(private readonly characterClassCreater: CharacterClassCreater) {}

  async handle(
    params: CharacterClassCreaterControllerParams,
  ): Promise<HTTPResponse> {
    await this.characterClassCreater.create(params.data)

    return {
      statusCode: 201,
      data: mockCharacterClass(),
    }
  }
}
