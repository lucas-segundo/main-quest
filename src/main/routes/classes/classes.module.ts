import { Module } from '@nestjs/common'
import { ClassesController } from './classes.controller'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { makeClassCreaterController } from 'presentation/controllers/ClassCreater/factory'
import { ClassFinderController } from 'presentation/controllers/ClassFinder'
import { makeClassFinderController } from 'presentation/controllers/ClassFinder/factory'

@Module({
  controllers: [ClassesController],
  providers: [
    {
      provide: ClassCreaterController,
      useFactory: () => makeClassCreaterController(),
    },
    {
      provide: ClassFinderController,
      useFactory: () => makeClassFinderController(),
    },
  ],
})
export class ClassesModule {}
