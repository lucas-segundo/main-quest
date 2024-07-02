import { Module } from '@nestjs/common'
import { SubclassesController } from './subclasses.controller'
import { SubclassCreaterController } from 'presentation/controllers/SubclassCreater'
import { makeSubclassCreaterController } from 'presentation/controllers/SubclassCreater/factory'

@Module({
  controllers: [SubclassesController],
  providers: [
    {
      provide: SubclassCreaterController,
      useFactory: () => makeSubclassCreaterController(),
    },
  ],
})
export class SubclassesModule {}
