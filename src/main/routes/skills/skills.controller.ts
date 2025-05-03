import { Controller, Get, Param, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { FindSkillController } from 'presentation/controllers/skills/FindSkill'
import { UpdateSkillController } from 'presentation/controllers/skills/UpdateSkill'
import {
  FindSkillsController,
  FindSkillsControllerParams,
} from 'presentation/controllers/skills/FindSkills'

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly findSkillController: FindSkillController,
    private readonly findSkillsController: FindSkillsController,
    private readonly updateSkillController: UpdateSkillController,
  ) {}

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
}
