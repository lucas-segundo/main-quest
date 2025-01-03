import { faker } from '@faker-js/faker'
import { ClassesFinder, ClassesFinderParams } from '.'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'
import { mockFindClassesRepository } from 'app/repositories/classes/FindClasses/mock'

export const mockClassesFinderParams = (): ClassesFinderParams => ({
  name: {
    like: faker.person.jobTitle(),
  },
})

export const mockClassesFinder = (): ClassesFinder =>
  new ClassesFinder(mockFindClassesRepository(), mockLogErrorRepository())
