import { faker } from '@faker-js/faker'
import { ClassCreater, ClassCreaterParams } from '.'
import { mockCreateClassRepository } from 'app/repositories/classes/CreateClass/mock'
import { mockLogErrorRepository } from 'app/repositories/loggers/LogError/mock'

export const mockClassCreaterParams = (): ClassCreaterParams => ({
  name: faker.person.firstName(),
})

export const mockClassCreater = (): ClassCreater =>
  new ClassCreater(mockCreateClassRepository(), mockLogErrorRepository())
