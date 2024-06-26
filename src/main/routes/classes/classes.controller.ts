import { Body, Controller, Post, Res } from '@nestjs/common'
import { ClassCreaterParams } from 'app/useCases/ClassCreater'
import { Response } from 'express'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classCreaterController: ClassCreaterController,
  ) {}

  @Post()
  async create(@Body() data: ClassCreaterParams, @Res() res: Response) {
    const response = await this.classCreaterController.handle({ data })

    if ('data' in response) {
      const { data, statusCode } = response
      return res.status(statusCode).json({ data })
    } else {
      const { errors, statusCode } = response
      return res.status(statusCode).json({ errors })
    }
  }
}
