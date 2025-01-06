import { Module } from '@nestjs/common'
import { SubclassesController } from './subclasses.controller'
import { CreateSubclassController } from 'presentation/controllers/CreateSubclass'
import { makeCreateSubclassController } from 'presentation/controllers/CreateSubclass/factory'
import { SubclassUpdaterController } from 'presentation/controllers/SubclassUpdater'
import { makeSubclassUpdaterController } from 'presentation/controllers/SubclassUpdater/factory'
import { FindSubclassController } from 'presentation/controllers/FindSubclass'
import { makeFindSubclassController } from 'presentation/controllers/FindSubclass/factory'

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
