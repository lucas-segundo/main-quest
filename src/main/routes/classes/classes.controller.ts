import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import { ClassCreaterParams } from 'app/useCases/classes/ClassCreater'
import { Response } from 'express'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { ClassFinderController } from 'presentation/controllers/ClassFinder'
import {
  ClassUpdaterController,
  ClassUpdaterControllerParams,
} from 'presentation/controllers/ClassUpdater'
import {
  ClassesFinderController,
  ClassesFinderControllerParams,
} from 'presentation/controllers/ClassesFinder'

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classCreaterController: ClassCreaterController,
    private readonly classFinderController: ClassFinderController,
    private readonly classesFinderController: ClassesFinderController,
    private readonly classUpdaterController: ClassUpdaterController,
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

  @Get()
  async findMany(
    @Query() query: ClassesFinderControllerParams,
    @Res() res: Response,
  ) {
    const response = await this.classesFinderController.handle({
      filter: query.filter,
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
    @Body() data: ClassUpdaterControllerParams['data'],
    @Res() res: Response,
  ) {
    const response = await this.classUpdaterController.handle({
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
