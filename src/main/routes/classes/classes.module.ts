import { Module } from '@nestjs/common'
import { ClassesController } from './classes.controller'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { makeClassCreaterController } from 'presentation/controllers/ClassCreater/factory'
import { ClassFinderController } from 'presentation/controllers/ClassFinder'
import { makeClassFinderController } from 'presentation/controllers/ClassFinder/factory'
import { ClassesFinderController } from 'presentation/controllers/ClassesFinder'
import { makeClassesFinderController } from 'presentation/controllers/ClassesFinder/factory'
import { ClassUpdaterController } from 'presentation/controllers/ClassUpdater'
import { makeClassUpdaterController } from 'presentation/controllers/ClassUpdater/factory'

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
    {
      provide: ClassesFinderController,
      useFactory: () => makeClassesFinderController(),
    },
    {
      provide: ClassUpdaterController,
      useFactory: () => makeClassUpdaterController(),
    },
  ],
})
export class ClassesModule {}
