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
import { AddClassSkillController } from 'presentation/controllers/classes/AddClassSkill'
import { makeAddClassSkillController } from 'presentation/controllers/classes/AddClassSkill/factory'
import { makeRemoveClassSkillController } from 'presentation/controllers/classes/RemoveClassSkill/factory'
import { RemoveClassSkillController } from 'presentation/controllers/classes/RemoveClassSkill'

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
      provide: AddClassSkillController,
      useFactory: () => makeAddClassSkillController(),
    },
    {
      provide: RemoveClassSkillController,
      useFactory: () => makeRemoveClassSkillController(),
    },
  ],
})
export class ClassesModule {}
