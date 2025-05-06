import { Module } from '@nestjs/common'
import { SubclassesController } from './subclasses.controller'
import { CreateSubclassController } from 'presentation/controllers/subclasses/CreateSubclass'
import { makeCreateSubclassController } from 'presentation/controllers/subclasses/CreateSubclass/factory'
import { UpdateSubclassController } from 'presentation/controllers/subclasses/UpdateSubclass'
import { makeSubclassUpdaterController } from 'presentation/controllers/subclasses/UpdateSubclass/factory'
import { FindSubclassController } from 'presentation/controllers/subclasses/FindSubclass'
import { makeFindSubclassController } from 'presentation/controllers/subclasses/FindSubclass/factory'
import { AddSubclassSpellController } from 'presentation/controllers/subclasses/AddSubclassSpell'
import { makeAddSubclassSpellController } from 'presentation/controllers/subclasses/AddSubclassSpell/factory'
import { RemoveSubclassSpellController } from 'presentation/controllers/subclasses/RemoveSubclassSpell'
import { makeRemoveSubclassSpellController } from 'presentation/controllers/subclasses/RemoveSubclassSpell/factory'

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
      provide: AddSubclassSpellController,
      useFactory: () => makeAddSubclassSpellController(),
    },
    {
      provide: RemoveSubclassSpellController,
      useFactory: () => makeRemoveSubclassSpellController(),
    },
  ],
})
export class SubclassesModule {}
