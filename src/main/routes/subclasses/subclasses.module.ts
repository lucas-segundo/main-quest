import { Module } from '@nestjs/common'
import { SubclassesController } from './subclasses.controller'
import { CreateSubclassController } from 'presentation/controllers/classes/CreateSubclass'
import { makeCreateSubclassController } from 'presentation/controllers/classes/CreateSubclass/factory'
import { SubclassUpdaterController } from 'presentation/controllers/subclasses/SubclassUpdater'
import { makeSubclassUpdaterController } from 'presentation/controllers/subclasses/SubclassUpdater/factory'
import { FindSubclassController } from 'presentation/controllers/subclasses/FindSubclass'
import { makeFindSubclassController } from 'presentation/controllers/subclasses/FindSubclass/factory'

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
      provide: SubclassUpdaterController,
      useFactory: () => makeSubclassUpdaterController(),
    },
  ],
})
export class SubclassesModule {}
