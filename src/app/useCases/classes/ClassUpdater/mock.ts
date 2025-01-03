import { faker } from '@faker-js/faker'
import { ClassUpdater, ClassUpdaterParams } from '.'
import { mockErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/mock'
import { mockUpdateClassRepository } from 'app/repositories/classes/UpdateClass/mock'

export const mockClassUpdaterParams = (): ClassUpdaterParams => ({
  name: faker.person.firstName(),
})

export const mockClassUpdater = (): ClassUpdater =>
  new ClassUpdater(mockUpdateClassRepository(), mockErrorLoggerRepo())
