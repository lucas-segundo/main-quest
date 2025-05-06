import { makeFindSpellsRepository } from 'entities/Spell/repositories/FindSpells/factory'
import { FindSpellsController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeFindSpellsController = (): FindSpellsController => {
  return new FindSpellsController(
    makeFindSpellsRepository(),
    makeHTTPErrorHandler(),
  )
}
