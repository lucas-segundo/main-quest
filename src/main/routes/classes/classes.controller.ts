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
  UpdateClassController,
  UpdateClassControllerParams,
} from 'presentation/controllers/classes/UpdateClass'
import {
  FindClassesController,
  FindClassesControllerParams,
} from 'presentation/controllers/classes/FindClasses'
import { AddClassSkillController } from 'presentation/controllers/classes/AddClassSkill'
import { RemoveClassSkillController } from 'presentation/controllers/classes/RemoveClassSkill'

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classCreaterController: CreateClassController,
    private readonly classFinderController: FindClassController,
    private readonly findClassesRepoController: FindClassesController,
    private readonly updateClassController: UpdateClassController,
    private readonly addClassSkillController: AddClassSkillController,
    private readonly removeClassSkillController: RemoveClassSkillController,
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
    @Body() data: UpdateClassControllerParams['data'],
    @Res() res: Response,
  ) {
    const response = await this.updateClassController.handle({
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

  @Patch(':id/add-skills')
  async addSkill(
    @Param('id') id: string,
    @Body() body: { skillIDs: string[] },
    @Res() res: Response,
  ) {
    const response = await this.addClassSkillController.handle(
      id,
      body.skillIDs,
    )

    if ('data' in response) {
      const { data, statusCode } = response
      return res.status(statusCode).json({ data })
    } else {
      const { errors, statusCode } = response
      return res.status(statusCode).json({ errors })
    }
  }

  @Patch(':id/remove-skills')
  async removeSkill(
    @Param('id') id: string,
    @Body() body: { skillIDs: string[] },
    @Res() res: Response,
  ) {
    const response = await this.removeClassSkillController.handle(
      id,
      body.skillIDs,
    )

    if ('data' in response) {
      const { data, statusCode } = response
      return res.status(statusCode).json({ data })
    } else {
      const { errors, statusCode } = response
      return res.status(statusCode).json({ errors })
    }
  }
}
