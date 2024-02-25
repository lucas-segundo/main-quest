import { Body, Controller, Post, Res } from '@nestjs/common'
import { CharacterClassCreaterParams } from 'domain/useCases/CharacterClassCreater'
import { Response } from 'express'
import { CharacterClassCreaterController } from 'presentation/controllers/CharacterClassCreater'

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly characterClassCreaterController: CharacterClassCreaterController,
  ) {}

  @Post()
  async create(
    @Body() data: CharacterClassCreaterParams,
    @Res() res: Response,
  ) {
    const response = await this.characterClassCreaterController.handle({ data })

    if ('data' in response) {
      const { data, statusCode } = response
      return res.status(statusCode).json({ data })
    } else {
      const { errors, statusCode } = response
      return res.status(statusCode).json({ errors })
    }
  }
}
