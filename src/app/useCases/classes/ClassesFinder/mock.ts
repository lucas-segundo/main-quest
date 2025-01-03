import { faker } from '@faker-js/faker'
import { ClassesFinder, ClassesFinderParams } from '.'
import { mockErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/mock'
import { mockFindClassesRepository } from 'app/repositories/classes/ClassesFinderRepo/mock'

export const mockClassesFinderParams = (): ClassesFinderParams => ({
  name: {
    like: faker.person.jobTitle(),
  },
})

export const mockClassesFinder = (): ClassesFinder =>
  new ClassesFinder(mockFindClassesRepository(), mockErrorLoggerRepo())
