import { faker } from '@faker-js/faker'
import { SubclassUpdater, SubclassUpdaterParams } from '.'
import { mockUpdateSubclassRepository } from 'app/repositories/subclasses/UpdateSubclassRepository/mock'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'

export const mockSubclassUpdaterParams = (): SubclassUpdaterParams => ({
  name: faker.person.firstName(),
})

export const mockSubclassUpdater = (): SubclassUpdater =>
  new SubclassUpdater(mockUpdateSubclassRepository(), mockLogErrorRepository())
