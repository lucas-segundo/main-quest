import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'
import { FindSpellController } from '.'
import { makeFindSpellService } from 'domain/entities/Spell/services/FindSpell/factory'

export const makeFindSpellController = (): FindSpellController => {
  return new FindSpellController(makeFindSpellService(), makeHTTPErrorHandler())
}
