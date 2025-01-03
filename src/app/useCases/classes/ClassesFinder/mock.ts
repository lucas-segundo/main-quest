import { faker } from '@faker-js/faker'
import { ClassesFinder, ClassesFinderParams } from '.'
import { mockClassesFinderRepo } from 'app/repositories/classes/ClassesFinderRepo/mock'
import { mockErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/mock'

export const mockClassesFinderParams = (): ClassesFinderParams => ({
  name: {
    like: faker.person.jobTitle(),
  },
})

export const mockClassesFinder = (): ClassesFinder =>
  new ClassesFinder(mockClassesFinderRepo(), mockErrorLoggerRepo())
