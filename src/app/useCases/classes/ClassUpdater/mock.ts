import { faker } from '@faker-js/faker'
import { ClassUpdater, ClassUpdaterParams } from '.'
import { mockClassUpdaterRepo } from 'app/interfaces/ClassUpdaterRepo/mock'
import { mockErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepo/mock'

export const mockClassUpdaterParams = (): ClassUpdaterParams => ({
  name: faker.person.firstName(),
})

export const mockClassUpdater = (): ClassUpdater =>
  new ClassUpdater(mockClassUpdaterRepo(), mockErrorLoggerRepo())
