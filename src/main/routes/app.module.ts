import { Module } from '@nestjs/common'
import { ClassesModule } from './classes/classes.module'
import { SubclassesModule } from './subclasses/subclasses.module'
import { SpellsModule } from './spells/spells.module'

@Module({
  imports: [ClassesModule, SubclassesModule, SpellsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
