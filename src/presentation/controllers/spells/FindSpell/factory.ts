import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { FindSpellController } from '.'
import { makeFindSpellService } from 'entities/Spell/services/FindSpell/factory'

export const makeFindSpellController = (): FindSpellController => {
  return new FindSpellController(makeFindSpellService(), makeHTTPErrorHandler())
}
