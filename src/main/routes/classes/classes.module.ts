import { Module } from '@nestjs/common'
import { ClassesController } from './classes.controller'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { makeClassCreaterController } from 'presentation/controllers/ClassCreater/factory'

@Module({
  controllers: [ClassesController],
  providers: [
    {
      provide: ClassCreaterController,
      useFactory: () => makeClassCreaterController(),
    },
  ],
})
export class ClassesModule {}
