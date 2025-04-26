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
import { FindSkillController } from 'presentation/controllers/skills/FindSkill'
import {
  UpdateSkillController,
  UpdateSkillControllerParams,
} from 'presentation/controllers/skills/UpdateSkill'
import {
  FindSkillsController,
  FindSkillsControllerParams,
} from 'presentation/controllers/skills/FindSkills'
import {
  CreateSkillController,
  CreateSkillControllerParams,
} from 'presentation/controllers/skills/CreateSkill'

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly createSkillController: CreateSkillController,
    private readonly findSkillController: FindSkillController,
    private readonly findSkillsController: FindSkillsController,
    private readonly updateSkillController: UpdateSkillController,
  ) {}

  @Post()
  async create(
    @Body() body: CreateSkillControllerParams,
    @Res() res: Response,
  ) {
    const response = await this.createSkillController.handle(body)

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
    const response = await this.findSkillController.handle({
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
    @Query() query: FindSkillsControllerParams,
    @Res() res: Response,
  ) {
    const response = await this.findSkillsController.handle({
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
    @Body() data: UpdateSkillControllerParams['data'],
    @Res() res: Response,
  ) {
    const response = await this.updateSkillController.handle({
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
