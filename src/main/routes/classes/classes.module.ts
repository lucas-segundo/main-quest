import { Module } from '@nestjs/common'
import { ClassesController } from './classes.controller'
import { CreateClassController } from 'presentation/controllers/CreateClass'
import { makeCreateClassController } from 'presentation/controllers/CreateClass/factory'
import { FindClassController } from 'presentation/controllers/FindClass'
import { makeFindClassController } from 'presentation/controllers/FindClass/factory'
import { FindClassesController } from 'presentation/controllers/FindClasses'
import { makeFindClassesController } from 'presentation/controllers/FindClasses/factory'
import { ClassUpdaterController } from 'presentation/controllers/ClassUpdater'
import { makeClassUpdaterController } from 'presentation/controllers/ClassUpdater/factory'

@Module({
  controllers: [ClassesController],
  providers: [
    {
      provide: CreateClassController,
      useFactory: () => makeCreateClassController(),
    },
    {
      provide: FindClassController,
      useFactory: () => makeFindClassController(),
    },
    {
      provide: FindClassesController,
      useFactory: () => makeFindClassesController(),
    },
    {
      provide: ClassUpdaterController,
      useFactory: () => makeClassUpdaterController(),
    },
  ],
})
export class ClassesModule {}
