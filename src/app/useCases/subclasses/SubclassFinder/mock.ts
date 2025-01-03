import { faker } from '@faker-js/faker'
import { SubclassFinder, SubclassFinderParams } from '.'
import { mockFindSubclasses } from 'app/repositories/subclasses/FindSubclasses/mock'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'

export const mockSubclassFinderParams = (): SubclassFinderParams => ({
  id: {
    equals: faker.string.uuid(),
  },
})

export const mockSubclassFinder = (): SubclassFinder =>
  new SubclassFinder(mockFindSubclasses(), mockLogErrorRepository())
