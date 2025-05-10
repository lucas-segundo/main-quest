import { Module } from '@nestjs/common'
import { SpellsController } from './spells.controller'
import { FindSpellController } from 'presentation/controllers/spells/FindSpell'
import { makeFindSpellController } from 'presentation/controllers/spells/FindSpell/factory'
import { FindSpellsController } from 'presentation/controllers/spells/FindSpells'
import { makeFindSpellsController } from 'presentation/controllers/spells/FindSpells/factory'
import { HealingWordController } from 'presentation/controllers/spells/HealingWord'
import { makeHealingWordController } from 'presentation/controllers/spells/HealingWord/factory'
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
    {
      provide: HealingWordController,
      useFactory: () => makeHealingWordController(),
    },
  ],
})
export class SpellsModule {}
