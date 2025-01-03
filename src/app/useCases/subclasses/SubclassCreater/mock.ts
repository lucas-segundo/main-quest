import { faker } from '@faker-js/faker'
import { SubclassCreater, SubclassCreaterParams } from '.'
import { mockSubclassCreaterRepo } from 'app/repositories/subclasses/SubclassCreaterRepo/mock'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogErrorRepository/mock'

export const mockSubclassCreaterParams = (): SubclassCreaterParams => ({
  name: faker.person.firstName(),
  classID: faker.string.uuid(),
})

export const mockSubclassCreater = (): SubclassCreater =>
  new SubclassCreater(mockSubclassCreaterRepo(), mockLogErrorRepository())
