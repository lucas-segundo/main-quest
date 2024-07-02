import { Body, Controller, Post, Res } from '@nestjs/common'
import { SubclassCreaterParams } from 'app/useCases/SubclassCreater'
import { Response } from 'express'
import { SubclassCreaterController } from 'presentation/controllers/SubclassCreater'

@Controller('subclasses')
export class SubclassesController {
  constructor(
    private readonly subclassCreaterController: SubclassCreaterController,
  ) {}

  @Post()
  async create(@Body() data: SubclassCreaterParams, @Res() res: Response) {
    const response = await this.subclassCreaterController.handle({ data })

    if ('data' in response) {
      const { data, statusCode } = response
      return res.status(statusCode).json({ data })
    } else {
      const { errors, statusCode } = response
      return res.status(statusCode).json({ errors })
    }
  }
}
