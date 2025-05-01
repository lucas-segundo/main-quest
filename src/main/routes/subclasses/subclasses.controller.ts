import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { AddSubclassSkillController } from 'presentation/controllers/subclasses/AddSubclassSkill'
import {
  CreateSubclassController,
  CreateSubclassControllerParams,
} from 'presentation/controllers/subclasses/CreateSubclass'
import { FindSubclassController } from 'presentation/controllers/subclasses/FindSubclass'
import {
  UpdateSubclassController,
  UpdateSubclassControllerParams,
} from 'presentation/controllers/subclasses/UpdateSubclass'

@Controller('subclasses')
export class SubclassesController {
  constructor(
    private readonly subclassCreaterController: CreateSubclassController,
    private readonly subclassFinderController: FindSubclassController,
    private readonly subclassUpdaterController: UpdateSubclassController,
    private readonly addSubclassSkillController: AddSubclassSkillController,
    private readonly removeSubclassSkillController: AddSubclassSkillController,
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
    @Body() data: UpdateSubclassControllerParams['data'],
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

  @Patch(':id/add-skills')
  async addSkill(
    @Param('id') id: string,
    @Body() body: { skillIDs: string[] },
    @Res() res: Response,
  ) {
    const response = await this.addSubclassSkillController.handle(
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
    const response = await this.removeSubclassSkillController.handle(
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
