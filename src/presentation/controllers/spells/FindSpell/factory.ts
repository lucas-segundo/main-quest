import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { FindSpellController } from '.'
import { makeFindSpellRepository } from 'entities/Spell/repositories/FindSpell/factory'

export const makeFindSpellController = (): FindSpellController => {
  return new FindSpellController(
    makeFindSpellRepository(),
    makeHTTPErrorHandler(),
  )
}
