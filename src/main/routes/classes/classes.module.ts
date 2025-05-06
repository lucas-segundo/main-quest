import { Module } from '@nestjs/common'
import { ClassesController } from './classes.controller'
import { CreateClassController } from 'presentation/controllers/classes/CreateClass'
import { makeCreateClassController } from 'presentation/controllers/classes/CreateClass/factory'
import { FindClassController } from 'presentation/controllers/classes/FindClass'
import { makeFindClassController } from 'presentation/controllers/classes/FindClass/factory'
import { FindClassesController } from 'presentation/controllers/classes/FindClasses'
import { makeFindClassesController } from 'presentation/controllers/classes/FindClasses/factory'
import { UpdateClassController } from 'presentation/controllers/classes/UpdateClass'
import { makeClassUpdaterController } from 'presentation/controllers/classes/UpdateClass/factory'
import { AddClassSpellController } from 'presentation/controllers/classes/AddClassSpell'
import { makeAddClassSpellController } from 'presentation/controllers/classes/AddClassSpell/factory'
import { makeRemoveClassSpellController } from 'presentation/controllers/classes/RemoveClassSpell/factory'
import { RemoveClassSpellController } from 'presentation/controllers/classes/RemoveClassSpell'

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
      provide: UpdateClassController,
      useFactory: () => makeClassUpdaterController(),
    },
    {
      provide: AddClassSpellController,
      useFactory: () => makeAddClassSpellController(),
    },
    {
      provide: RemoveClassSpellController,
      useFactory: () => makeRemoveClassSpellController(),
    },
  ],
})
export class ClassesModule {}
