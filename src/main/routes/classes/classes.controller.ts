import { Body, Controller, Post } from '@nestjs/common'
import { CharacterClassCreaterParams } from 'domain/useCases/CharacterClassCreater'
import { CharacterClassCreaterController } from 'presentation/controllers/CharacterClassCreater'

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly characterClassCreaterController: CharacterClassCreaterController,
  ) {}

  @Post()
  create(@Body() data: CharacterClassCreaterParams) {
    return this.characterClassCreaterController.handle({ data })
  }
}
