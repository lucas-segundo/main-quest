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
  CreateCharacterController,
  CreateCharacterControllerParams,
} from 'presentation/controllers/character/CreateCharacter'
import { FindCharacterController } from 'presentation/controllers/character/FindCharacter'
import {
  FindCharactersController,
  FindCharactersControllerParams,
} from 'presentation/controllers/character/FindCharacters'
import {
  UpdateCharacterController,
  UpdateCharacterControllerParams,
} from 'presentation/controllers/character/UpdateCharacter'

@Controller('characters')
export class CharactersController {
  constructor(
    private readonly createCharacterController: CreateCharacterController,
    private readonly findCharacterController: FindCharacterController,
    private readonly findCharactersController: FindCharactersController,
    private readonly updateCharacterController: UpdateCharacterController,
  ) {}

  @Post()
  async create(
    @Body() body: CreateCharacterControllerParams,
    @Res() res: Response,
  ) {
    const response = await this.createCharacterController.handle(body)

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
    const response = await this.findCharacterController.handle({
      id,
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
    @Query() query: FindCharactersControllerParams,
    @Res() res: Response,
  ) {
    const response = await this.findCharactersController.handle(query)

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
    @Body() data: UpdateCharacterControllerParams['data'],
    @Res() res: Response,
  ) {
    const response = await this.updateCharacterController.handle({
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
