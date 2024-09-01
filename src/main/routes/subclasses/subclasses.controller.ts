import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common'
import { SubclassCreaterParams } from 'app/useCases/subclasses/SubclassCreater'
import { Response } from 'express'
import { SubclassCreaterController } from 'presentation/controllers/SubclassCreater'
import { SubclassFinderController } from 'presentation/controllers/SubclassFinder'
import {
  SubclassUpdaterController,
  SubclassUpdaterControllerParams,
} from 'presentation/controllers/SubclassUpdater'

@Controller('subclasses')
export class SubclassesController {
  constructor(
    private readonly subclassCreaterController: SubclassCreaterController,
    private readonly subclassFinderController: SubclassFinderController,
    private readonly subclassUpdaterController: SubclassUpdaterController,
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

  @Get(':id')
  async find(@Param('id') id: string, @Res() res: Response) {
    const response = await this.subclassFinderController.handle({
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: SubclassUpdaterControllerParams['data'],
    @Res() res: Response,
  ) {
    const response = await this.subclassUpdaterController.handle({
      id,
      data,
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
