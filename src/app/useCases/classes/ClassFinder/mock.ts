import { faker } from '@faker-js/faker'
import { ClassFinder, ClassFinderParams } from '.'
import { mockClassFinderRepo } from 'app/interfaces/classes/ClassFinderRepo/mock'
import { mockErrorLoggerRepo } from 'app/interfaces/loggers/ErrorLoggerRepo/mock'

export const mockClassFinderParams = (): ClassFinderParams => ({
  id: {
    equals: faker.string.uuid(),
  },
})

export const mockClassFinder = (): ClassFinder =>
  new ClassFinder(mockClassFinderRepo(), mockErrorLoggerRepo())
