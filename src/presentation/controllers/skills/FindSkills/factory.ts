import { makeFindSkillsRepository } from 'domain/entities/Skill/repositories/FindSkills/factory'
import { FindSkillsController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeFindSkillsController = (): FindSkillsController => {
  return new FindSkillsController(
    makeFindSkillsRepository(),
    makeHTTPErrorHandler(),
  )
}
