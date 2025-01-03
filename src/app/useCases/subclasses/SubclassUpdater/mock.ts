import { faker } from '@faker-js/faker'
import { SubclassUpdater, SubclassUpdaterParams } from '.'
import { mockSubclassUpdaterRepo } from 'app/repositories/subclasses/SubclassUpdaterRepo/mock'
import { mockErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/mock'

export const mockSubclassUpdaterParams = (): SubclassUpdaterParams => ({
  name: faker.person.firstName(),
})

export const mockSubclassUpdater = (): SubclassUpdater =>
  new SubclassUpdater(mockSubclassUpdaterRepo(), mockErrorLoggerRepo())
