import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common'
import { ClassCreaterParams } from 'app/useCases/ClassCreater'
import { Response } from 'express'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { ClassFinderController } from 'presentation/controllers/ClassFinder'

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classCreaterController: ClassCreaterController,
    private readonly classFinderController: ClassFinderController,
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

  @Get(':id')
  async find(@Param('id') id: string, @Res() res: Response) {
    const response = await this.classFinderController.handle({
      query: {
        id: {
          equals: id,
        },
      },
    })

    if ('data' in response) {
      const { data, statusCode } = response
      return res.status(statusCode).json({ data })
    } else {
      const { errors, statusCode } = response
      return res.status(statusCode).json({ errors })
    }
  }
}
