import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { AddSubclassSpellController } from 'presentation/controllers/subclasses/AddSubclassSpell'
import {
  CreateSubclassController,
  CreateSubclassControllerParams,
} from 'presentation/controllers/subclasses/CreateSubclass'
import { FindSubclassController } from 'presentation/controllers/subclasses/FindSubclass'
import { RemoveSubclassSpellController } from 'presentation/controllers/subclasses/RemoveSubclassSpell'
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
    private readonly addSubclassSpellController: AddSubclassSpellController,
    private readonly removeSubclassSpellController: RemoveSubclassSpellController,
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

  @Patch(':id/add-spells')
  async addSpell(
    @Param('id') id: string,
    @Body() body: { spellIDs: string[] },
    @Res() res: Response,
  ) {
    const response = await this.addSubclassSpellController.handle(
      id,
      body.spellIDs,
    )

    if ('data' in response) {
      const { data, statusCode } = response
      return res.status(statusCode).json({ data })
    } else {
      const { errors, statusCode } = response
      return res.status(statusCode).json({ errors })
    }
  }

  @Patch(':id/remove-spells')
  async removeSpell(
    @Param('id') id: string,
    @Body() body: { spellIDs: string[] },
    @Res() res: Response,
  ) {
    const response = await this.removeSubclassSpellController.handle(
      id,
      body.spellIDs,
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
