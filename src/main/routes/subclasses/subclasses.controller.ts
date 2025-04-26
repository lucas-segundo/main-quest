import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import {
  CreateSubclassController,
  CreateSubclassControllerParams,
} from 'presentation/controllers/classes/CreateSubclass'
import { FindSubclassController } from 'presentation/controllers/subclasses/FindSubclass'
import {
  SubclassUpdaterController,
  SubclassUpdaterControllerParams,
} from 'presentation/controllers/subclasses/UpdateSubclass'

@Controller('subclasses')
export class SubclassesController {
  constructor(
    private readonly subclassCreaterController: CreateSubclassController,
    private readonly subclassFinderController: FindSubclassController,
    private readonly subclassUpdaterController: SubclassUpdaterController,
  ) {}

  @Post()
  async create(
    @Body() body: CreateSubclassControllerParams,
    @Res() res: Response,
  ) {
    const response = await this.subclassCreaterController.handle(body)

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
      filter: {
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
