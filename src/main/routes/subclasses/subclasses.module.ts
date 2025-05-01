import { Module } from '@nestjs/common'
import { SubclassesController } from './subclasses.controller'
import { CreateSubclassController } from 'presentation/controllers/subclasses/CreateSubclass'
import { makeCreateSubclassController } from 'presentation/controllers/subclasses/CreateSubclass/factory'
import { UpdateSubclassController } from 'presentation/controllers/subclasses/UpdateSubclass'
import { makeSubclassUpdaterController } from 'presentation/controllers/subclasses/UpdateSubclass/factory'
import { FindSubclassController } from 'presentation/controllers/subclasses/FindSubclass'
import { makeFindSubclassController } from 'presentation/controllers/subclasses/FindSubclass/factory'
import { AddSubclassSkillController } from 'presentation/controllers/subclasses/AddSubclassSkill'
import { makeAddSubclassSkillController } from 'presentation/controllers/subclasses/AddSubclassSkill/factory'
import { RemoveSubclassSkillController } from 'presentation/controllers/subclasses/RemoveSubclassSkill'
import { makeRemoveSubclassSkillController } from 'presentation/controllers/subclasses/RemoveSubclassSkill/factory'

@Module({
  controllers: [SubclassesController],
  providers: [
    {
      provide: CreateSubclassController,
      useFactory: () => makeCreateSubclassController(),
    },
    {
      provide: FindSubclassController,
      useFactory: () => makeFindSubclassController(),
    },
    {
      provide: UpdateSubclassController,
      useFactory: () => makeSubclassUpdaterController(),
    },
    {
      provide: AddSubclassSkillController,
      useFactory: () => makeAddSubclassSkillController(),
    },
    {
      provide: RemoveSubclassSkillController,
      useFactory: () => makeRemoveSubclassSkillController(),
    },
  ],
})
export class SubclassesModule {}
