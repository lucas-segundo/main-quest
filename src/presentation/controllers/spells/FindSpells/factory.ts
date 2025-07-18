import { makeFindSpellsService } from 'domain/entities/Spell/services/FindSpells/factory'
import { FindSpellsController } from '.'
import { makeHTTPErrorHandler } from 'presentation/helpers/HTTPErrorHandler/factory'

export const makeFindSpellsController = (): FindSpellsController => {
  return new FindSpellsController(
    makeFindSpellsService(),
    makeHTTPErrorHandler(),
  )
}
