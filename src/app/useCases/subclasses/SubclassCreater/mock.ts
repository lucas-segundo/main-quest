import { faker } from '@faker-js/faker'
import { SubclassCreater, SubclassCreaterParams } from '.'
import { mockSubclassCreaterRepo } from 'app/interfaces/subclasses/SubclassCreaterRepo/mock'
import { mockErrorLoggerRepo } from 'app/interfaces/ErrorLoggerRepo/mock'

export const mockSubclassCreaterParams = (): SubclassCreaterParams => ({
  name: faker.person.firstName(),
  classID: faker.string.uuid(),
})

export const mockSubclassCreater = (): SubclassCreater =>
  new SubclassCreater(mockSubclassCreaterRepo(), mockErrorLoggerRepo())
