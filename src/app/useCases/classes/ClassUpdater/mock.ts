import { faker } from '@faker-js/faker'
import { ClassUpdater, ClassUpdaterParams } from '.'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'
import { mockUpdateClassRepository } from 'app/repositories/classes/UpdateClass/mock'

export const mockClassUpdaterParams = (): ClassUpdaterParams => ({
  name: faker.person.firstName(),
})

export const mockClassUpdater = (): ClassUpdater =>
  new ClassUpdater(mockUpdateClassRepository(), mockLogErrorRepository())
