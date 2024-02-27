import { Module } from '@nestjs/common'
import { ClassesController } from './classes.controller'
import { makeClassCreaterController } from 'main/factories/classCreaterController'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'

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
