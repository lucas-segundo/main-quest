import { Module } from '@nestjs/common'
import { CreateCharacterController } from 'presentation/controllers/character/CreateCharacter'
import { makeCreateCharacterController } from 'presentation/controllers/character/CreateCharacter/factory'
import { CharactersController } from './chracters.controller'
import { FindCharacterController } from 'presentation/controllers/character/FindCharacter'
import { makeFindCharacterController } from 'presentation/controllers/character/FindCharacter/factory'
import { FindCharactersController } from 'presentation/controllers/character/FindCharacters'
import { makeFindCharactersController } from 'presentation/controllers/character/FindCharacters/factory'
import { UpdateCharacterController } from 'presentation/controllers/character/UpdateCharacter'
import { makeUpdateCharacterController } from 'presentation/controllers/character/UpdateCharacter/factory'

@Module({
  controllers: [CharactersController],
  providers: [
    {
      provide: CreateCharacterController,
      useFactory: () => makeCreateCharacterController(),
    },
    {
      provide: FindCharacterController,
      useFactory: () => makeFindCharacterController(),
    },
    {
      provide: FindCharactersController,
      useFactory: () => makeFindCharactersController(),
    },
    {
      provide: UpdateCharacterController,
      useFactory: () => makeUpdateCharacterController(),
    },
  ],
})
export class CharactersModule {}
