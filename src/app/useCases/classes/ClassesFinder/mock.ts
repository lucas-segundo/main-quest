import { faker } from '@faker-js/faker'
import { ClassesFinder, ClassesFinderParams } from '.'
import { mockClassesFinderRepo } from 'app/interfaces/classes/ClassesFinderRepo/mock'
import { mockErrorLoggerRepo } from 'app/interfaces/loggers/ErrorLoggerRepo/mock'

export const mockClassesFinderParams = (): ClassesFinderParams => ({
  name: {
    like: faker.person.jobTitle(),
  },
})

export const mockClassesFinder = (): ClassesFinder =>
  new ClassesFinder(mockClassesFinderRepo(), mockErrorLoggerRepo())
