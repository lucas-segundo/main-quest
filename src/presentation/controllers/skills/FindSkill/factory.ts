import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { FindSkillController } from '.'
import { makeFindSkillRepository } from 'entities/Skill/repositories/FindSkill/factory'

export const makeFindSkillController = (): FindSkillController => {
  return new FindSkillController(
    makeFindSkillRepository(),
    makeHTTPErrorHandler(),
  )
}
