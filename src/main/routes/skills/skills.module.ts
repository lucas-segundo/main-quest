import { Module } from '@nestjs/common'
import { SkillsController } from './skills.controller'
import { CreateSkillController } from 'presentation/controllers/skills/CreateSkill'
import { makeCreateSkillController } from 'presentation/controllers/skills/CreateSkill/factory'
import { FindSkillController } from 'presentation/controllers/skills/FindSkill'
import { makeFindSkillController } from 'presentation/controllers/skills/FindSkill/factory'
import { FindSkillsController } from 'presentation/controllers/skills/FindSkills'
import { makeFindSkillsController } from 'presentation/controllers/skills/FindSkills/factory'
import { makeUpdateSkillController } from 'presentation/controllers/skills/UpdateSkill/factory'
import { UpdateSkillController } from 'presentation/controllers/skills/UpdateSkill'

@Module({
  controllers: [SkillsController],
  providers: [
    {
      provide: CreateSkillController,
      useFactory: () => makeCreateSkillController(),
    },
    {
      provide: FindSkillController,
      useFactory: () => makeFindSkillController(),
    },
    {
      provide: FindSkillsController,
      useFactory: () => makeFindSkillsController(),
    },
    {
      provide: UpdateSkillController,
      useFactory: () => makeUpdateSkillController(),
    },
  ],
})
export class SkillsModule {}
