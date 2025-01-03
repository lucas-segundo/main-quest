import { faker } from '@faker-js/faker'
import { SubclassFinder, SubclassFinderParams } from '.'
import { mockSubclassFinderRepo } from 'app/repositories/subclasses/SubclassFinderRepo/mock'
import { mockErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/mock'

export const mockSubclassFinderParams = (): SubclassFinderParams => ({
  id: {
    equals: faker.string.uuid(),
  },
})

export const mockSubclassFinder = (): SubclassFinder =>
  new SubclassFinder(mockSubclassFinderRepo(), mockErrorLoggerRepo())
