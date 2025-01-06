import { Module } from '@nestjs/common'
import { SubclassesController } from './subclasses.controller'
import { CreateSubclassController } from 'presentation/controllers/CreateSubclass'
import { makeCreateSubclassController } from 'presentation/controllers/CreateSubclass/factory'
import { SubclassUpdaterController } from 'presentation/controllers/SubclassUpdater'
import { makeSubclassUpdaterController } from 'presentation/controllers/SubclassUpdater/factory'
import { SubclassFinderController } from 'presentation/controllers/SubclassFinder'
import { makeSubclassFinderController } from 'presentation/controllers/SubclassFinder/factory'

@Module({
  controllers: [SubclassesController],
  providers: [
    {
      provide: CreateSubclassController,
      useFactory: () => makeCreateSubclassController(),
    },
    {
      provide: SubclassFinderController,
      useFactory: () => makeSubclassFinderController(),
    },
    {
      provide: SubclassUpdaterController,
      useFactory: () => makeSubclassUpdaterController(),
    },
  ],
})
export class SubclassesModule {}
