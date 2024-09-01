import { Module } from '@nestjs/common'
import { SubclassesController } from './subclasses.controller'
import { SubclassCreaterController } from 'presentation/controllers/SubclassCreater'
import { makeSubclassCreaterController } from 'presentation/controllers/SubclassCreater/factory'
import { SubclassUpdaterController } from 'presentation/controllers/SubclassUpdater'
import { makeSubclassUpdaterController } from 'presentation/controllers/SubclassUpdater/factory'

@Module({
  controllers: [SubclassesController],
  providers: [
    {
      provide: SubclassCreaterController,
      useFactory: () => makeSubclassCreaterController(),
    },
    {
      provide: SubclassUpdaterController,
      useFactory: () => makeSubclassUpdaterController(),
    },
  ],
})
export class SubclassesModule {}
