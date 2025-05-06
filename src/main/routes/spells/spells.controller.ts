import { Controller, Get, Param, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { FindSpellController } from 'presentation/controllers/spells/FindSpell'
import {
  FindSpellsController,
  FindSpellsControllerParams,
} from 'presentation/controllers/spells/FindSpells'

@Controller('spells')
export class SpellsController {
  constructor(
    private readonly findSpellController: FindSpellController,
    private readonly findSpellsController: FindSpellsController,
  ) {}

  @Get(':id')
  async find(@Param('id') id: string, @Res() res: Response) {
    const response = await this.findSpellController.handle({
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
    @Query() query: FindSpellsControllerParams,
    @Res() res: Response,
  ) {
    const response = await this.findSpellsController.handle({
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
