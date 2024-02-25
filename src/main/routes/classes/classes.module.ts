import { Module } from '@nestjs/common'
import { ClassesController } from './classes.controller'
import { makeCharacterClassCreaterController } from 'main/factories/characterClassCreaterController'
import { CharacterClassCreaterController } from 'presentation/controllers/CharacterClassCreater'

@Module({
  controllers: [ClassesController],
  providers: [
    {
      provide: CharacterClassCreaterController,
      useFactory: () => makeCharacterClassCreaterController(),
    },
  ],
})
export class ClassesModule {}
