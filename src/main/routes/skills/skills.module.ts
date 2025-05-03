import { Module } from '@nestjs/common'
import { SkillsController } from './skills.controller'
import { FindSkillController } from 'presentation/controllers/skills/FindSkill'
import { makeFindSkillController } from 'presentation/controllers/skills/FindSkill/factory'
import { FindSkillsController } from 'presentation/controllers/skills/FindSkills'
import { makeFindSkillsController } from 'presentation/controllers/skills/FindSkills/factory'
@Module({
  controllers: [SkillsController],
  providers: [
    {
      provide: FindSkillController,
      useFactory: () => makeFindSkillController(),
    },
    {
      provide: FindSkillsController,
      useFactory: () => makeFindSkillsController(),
    },
  ],
})
export class SkillsModule {}
