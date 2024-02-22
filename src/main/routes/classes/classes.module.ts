import { Module } from '@nestjs/common'
import { ClassesController } from './classes.controller'

@Module({
  controllers: [ClassesController],
  providers: [],
})
export class ClassesModule {}
