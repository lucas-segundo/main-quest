import { Module } from '@nestjs/common'
import { SpellsController } from './spells.controller'
import { FindSpellController } from 'presentation/controllers/spells/FindSpell'
import { makeFindSpellController } from 'presentation/controllers/spells/FindSpell/factory'
import { FindSpellsController } from 'presentation/controllers/spells/FindSpells'
import { makeFindSpellsController } from 'presentation/controllers/spells/FindSpells/factory'
@Module({
  controllers: [SpellsController],
  providers: [
    {
      provide: FindSpellController,
      useFactory: () => makeFindSpellController(),
    },
    {
      provide: FindSpellsController,
      useFactory: () => makeFindSpellsController(),
    },
  ],
})
export class SpellsModule {}
