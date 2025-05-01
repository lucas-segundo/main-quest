import { Module } from '@nestjs/common'
import { ClassesModule } from './classes/classes.module'
import { SubclassesModule } from './subclasses/subclasses.module'
import { SkillsModule } from './skills/skills.module'

@Module({
  imports: [ClassesModule, SubclassesModule, SkillsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
