import { Controller, Post } from '@nestjs/common'

@Controller('classes')
export class ClassesController {
  constructor() {}

  @Post()
  create() {}
}
