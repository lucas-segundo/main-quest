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
import { AddClassSpellController } from 'presentation/controllers/classes/AddClassSpell'
import { RemoveClassSpellController } from 'presentation/controllers/classes/RemoveClassSpell'

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classCreaterController: CreateClassController,
    private readonly classFinderController: FindClassController,
    private readonly findClassesRepoController: FindClassesController,
    private readonly updateClassController: UpdateClassController,
    private readonly addClassSpellController: AddClassSpellController,
    private readonly removeClassSpellController: RemoveClassSpellController,
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
          eq: id,
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
    @Body() body: UpdateClassControllerParams,
    @Res() res: Response,
  ) {
    const response = await this.updateClassController.handle(id, body)

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
    const response = await this.addClassSpellController.handle(
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
    const response = await this.removeClassSpellController.handle(
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
