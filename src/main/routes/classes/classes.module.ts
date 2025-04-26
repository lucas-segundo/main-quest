import { Module } from '@nestjs/common'
import { ClassesController } from './classes.controller'
import { CreateClassController } from 'presentation/controllers/classes/CreateClass'
import { makeCreateClassController } from 'presentation/controllers/classes/CreateClass/factory'
import { FindClassController } from 'presentation/controllers/classes/FindClass'
import { makeFindClassController } from 'presentation/controllers/classes/FindClass/factory'
import { FindClassesController } from 'presentation/controllers/classes/FindClasses'
import { makeFindClassesController } from 'presentation/controllers/classes/FindClasses/factory'
import { ClassUpdaterController } from 'presentation/controllers/classes/ClassUpdater'
import { makeClassUpdaterController } from 'presentation/controllers/classes/ClassUpdater/factory'

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
