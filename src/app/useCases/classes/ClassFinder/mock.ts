import { faker } from '@faker-js/faker'
import { ClassFinder, ClassFinderParams } from '.'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'
import { mockFindClassRepository } from 'domain/entities/Class/repositories/FindClass/mock'

export const mockClassFinderParams = (): ClassFinderParams => ({
  id: {
    equals: faker.string.uuid(),
  },
})

export const mockClassFinder = (): ClassFinder =>
  new ClassFinder(mockFindClassRepository(), mockLogErrorRepository())
