import { Module } from '@nestjs/common'
import { SubclassesController } from './subclasses.controller'
import { CreateSubclassController } from 'presentation/controllers/subclasses/CreateSubclass'
import { makeCreateSubclassController } from 'presentation/controllers/subclasses/CreateSubclass/factory'
import { UpdateSubclassController } from 'presentation/controllers/subclasses/UpdateSubclass'
import { makeSubclassUpdaterController } from 'presentation/controllers/subclasses/UpdateSubclass/factory'
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
      provide: UpdateSubclassController,
      useFactory: () => makeSubclassUpdaterController(),
    },
  ],
})
export class SubclassesModule {}
