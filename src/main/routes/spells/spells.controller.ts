import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common'
import { HealingWordDTO } from 'app/useCases/HealingWord'
import { Response } from 'express'
import { FindSpellController } from 'presentation/controllers/spells/FindSpell'
import {
  FindSpellsController,
  FindSpellsControllerParams,
} from 'presentation/controllers/spells/FindSpells'
import { HealingWordController } from 'presentation/controllers/spells/HealingWord'

@Controller('spells')
export class SpellsController {
  constructor(
    private readonly findSpellController: FindSpellController,
    private readonly findSpellsController: FindSpellsController,
    private readonly healingWordController: HealingWordController,
  ) {}

  @Get(':id')
  async find(@Param('id') id: string, @Res() res: Response) {
    const response = await this.findSpellController.handle({
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

  @Post('healing-word')
  async healingWord(@Body() body: HealingWordDTO, @Res() res: Response) {
    const response = await this.healingWordController.handle(body)

    if ('data' in response) {
      const { data, statusCode } = response
      return res.status(statusCode).json({ data })
    } else {
      const { errors, statusCode } = response
      return res.status(statusCode).json({ errors })
    }
  }
}
