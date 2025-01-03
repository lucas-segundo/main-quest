import { faker } from '@faker-js/faker'
import { ClassCreater, ClassCreaterParams } from '.'
import { mockErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/mock'
import { mockCreateClassRepository } from 'app/repositories/classes/CreateClass/mock'

export const mockClassCreaterParams = (): ClassCreaterParams => ({
  name: faker.person.firstName(),
})

export const mockClassCreater = (): ClassCreater =>
  new ClassCreater(mockCreateClassRepository(), mockErrorLoggerRepo())
