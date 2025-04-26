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
import { Response } from 'express'
import {
  CreateClassController,
  CreateClassControllerParams,
} from 'presentation/controllers/classes/CreateClass'
import { FindClassController } from 'presentation/controllers/classes/FindClass'
import {
  ClassUpdaterController,
  ClassUpdaterControllerParams,
} from 'presentation/controllers/classes/ClassUpdater'
import {
  FindClassesController,
  FindClassesControllerParams,
} from 'presentation/controllers/classes/FindClasses'

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classCreaterController: CreateClassController,
    private readonly classFinderController: FindClassController,
    private readonly findClassesRepoController: FindClassesController,
    private readonly classUpdaterController: ClassUpdaterController,
  ) {}

  @Post()
  async create(
    @Body() body: CreateClassControllerParams,
    @Res() res: Response,
  ) {
    const response = await this.classCreaterController.handle(body)

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

  @Get()
  async findMany(
    @Query() query: FindClassesControllerParams,
    @Res() res: Response,
  ) {
    const response = await this.findClassesRepoController.handle({
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
